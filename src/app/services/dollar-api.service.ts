import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DollarApiService {

  private readonly API_URL = 'https://dolarapi.com/v1/dolares/oficial';

  constructor(private http: HttpClient) { }

  getDollarRate(): Observable<number> {
    return this.http.get<any>(this.API_URL).pipe(
      map(res => res.venta ?? 1400),
      catchError(() => of(1400))
    );
  }
}