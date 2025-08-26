import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DollarApiService } from './dollar-api.service';
import { TestBed } from '@angular/core/testing';

export class QuoteLogic {
  private amount: number | null = null;
  private result = '';
  private exchangeRate: number;

  constructor(private dollarApiService: { getDollarRate: () => number }) {
    this.exchangeRate = dollarApiService.getDollarRate() || 1400;
  }

  setAmount(value: number | null) { this.amount = value; }
  getExchangeRate() { return this.exchangeRate; }
  getResult() { return this.result; }

  convertArsToUsd() {
    if (!this.amount) return (this.result = '');
    this.result = `${this.amount} ARS ≈ ${(this.amount / this.exchangeRate).toFixed(2)} USD`;
  }

  convertUsdToArs() {
    if (!this.amount) return (this.result = '');
    this.result = `${this.amount} USD ≈ ${(this.amount * this.exchangeRate).toFixed(3)} ARS`;
  }
}

const mockDollarApiService = { getDollarRate: () => 1500 };

describe('QuoteLogic test', () => {
  let logic: QuoteLogic;

  beforeEach(() => {
    logic = new QuoteLogic(mockDollarApiService);
  });

  it('should create', () => expect(logic).toBeTruthy());
  it('should return exchange rate', () => expect(logic.getExchangeRate()).toBe(1500));
  it('should convert ARS to USD', () => {
    logic.setAmount(3000);
    logic.convertArsToUsd();
    expect(logic.getResult()).toBe('3000 ARS ≈ 2.00 USD');
  });
  it('should convert USD to ARS', () => {
    logic.setAmount(2);
    logic.convertUsdToArs();
    expect(logic.getResult()).toBe('2 USD ≈ 3000.000 ARS');
  });
});