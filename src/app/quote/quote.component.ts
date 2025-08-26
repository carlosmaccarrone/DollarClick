import { DollarApiService } from '../services/dollar-api.service';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
  protected readonly amount = signal<number | null>(null);
  protected readonly result = signal<string>('');
  protected readonly exchangeRate = signal<number>(1400);

  constructor(private dollarApiService: DollarApiService) {
    this.dollarApiService.getDollarRate().subscribe({
      next: (rate: number) => this.exchangeRate.set(rate),
      error: () => console.error('Error getting quote, using fallback 1400')
    });
  }

  public getAmount() {
    return this.amount();
  }

  public getResult() {
    return this.result();
  }

  public getExchangeRate() {
    return this.exchangeRate();
  }

  public setAmount(value: number | null) {
    this.amount.set(value);
  }

  public validateNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '.');

    value = value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    input.value = value;
    this.amount.set(value ? parseFloat(value) : null);
  }

  private showResultAnimation() {
    const el = document.querySelector('.result') as HTMLElement | null;
    if (!el) return;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  convertArsToUsd() {
    if (this.amount() !== null) {
      const usd = this.amount()! / this.exchangeRate();
      this.result.set(`${this.amount()} ARS ≈ ${usd.toFixed(2)} USD`);
      this.showResultAnimation();
    }
  }

  convertUsdToArs() {
    if (this.amount() !== null) {
      const ars = this.amount()! * this.exchangeRate();
      this.result.set(`${this.amount()} USD ≈ ${ars.toFixed(3)} ARS`);
      this.showResultAnimation();
    }
  }
}