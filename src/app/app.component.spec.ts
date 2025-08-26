import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>DollarClick</h1>`
})
class AppComponentMock {}

beforeAll(() => {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
});

describe('AppComponent test', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponentMock],
    }).compileComponents();
  });

  it('should create the mock app', () => {
    const fixture = TestBed.createComponent(AppComponentMock);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentMock);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('DollarClick');
  });
});