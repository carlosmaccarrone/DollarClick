import { DollarApiService } from '../services/dollar-api.service';
import { QuoteComponent } from './quote.component';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let dollarApiServiceSpy: jasmine.SpyObj<DollarApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DollarApiService', ['getDollarRate']);

    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      providers: [
        { provide: DollarApiService, useValue: spy }
      ]
    });

    dollarApiServiceSpy = TestBed.inject(DollarApiService) as jasmine.SpyObj<DollarApiService>;
    dollarApiServiceSpy.getDollarRate.and.returnValue(of(1500));

    component = TestBed.createComponent(QuoteComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set exchangeRate from service', () => {
    expect(component.getExchangeRate()).toBe(1500);
  });

  it('should convert ARS to USD correctly', () => {
    component.setAmount(3000);
    component.convertArsToUsd();
    expect(component.getResult()).toBe('3000 ARS ≈ 2.00 USD');
  });

  it('should convert USD to ARS correctly', () => {
    component.setAmount(2);
    component.convertUsdToArs();
    expect(component.getResult()).toBe('2 USD ≈ 3000.000 ARS');
  });

  it('should handle null amount gracefully', () => {
    component.setAmount(null);
    component.convertArsToUsd();
    expect(component.getResult()).toBe('');
    component.convertUsdToArs();
    expect(component.getResult()).toBe('');
  });

  it('should fallback exchangeRate if service fails', () => {
    dollarApiServiceSpy.getDollarRate.and.returnValue(throwError(() => new Error('fail')));
    const comp = new QuoteComponent(dollarApiServiceSpy);
    expect(comp.getExchangeRate()).toBe(1400);
  });
});