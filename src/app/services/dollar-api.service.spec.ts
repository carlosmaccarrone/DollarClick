import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DollarApiService } from './dollar-api.service';
import { TestBed } from '@angular/core/testing';

describe('DollarApiService', () => {
  let service: DollarApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DollarApiService]
    });

    service = TestBed.inject(DollarApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the venta value from API', (done) => {
    const mockResponse = { venta: 1500 };

    service.getDollarRate().subscribe(rate => {
      expect(rate).toBe(1500);
      done();
    });

    const req = httpMock.expectOne('https://dolarapi.com/v1/dolares/oficial');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return fallback 1400 if API fails', (done) => {
    service.getDollarRate().subscribe(rate => {
      expect(rate).toBe(1400);
      done();
    });

    const req = httpMock.expectOne('https://dolarapi.com/v1/dolares/oficial');
    req.error(new ErrorEvent('Network error'));
  });

  it('should return fallback 1400 if venta is undefined', (done) => {
    const mockResponse = { venta: undefined };

    service.getDollarRate().subscribe(rate => {
      expect(rate).toBe(1400);
      done();
    });

    const req = httpMock.expectOne('https://dolarapi.com/v1/dolares/oficial');
    req.flush(mockResponse);
  });
});