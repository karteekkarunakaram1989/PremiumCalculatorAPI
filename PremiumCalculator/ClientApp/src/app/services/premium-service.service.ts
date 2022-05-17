import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CustomerDetails } from '../models/customer-details';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PremiumServiceService {
  // baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    // this.baseUrl = baseUrl;
  }

  getCalculatedPremium(customerDetails: CustomerDetails): Observable<number> {
    // return this.http.post<number>(this.baseUrl + 'api/premiumCalculator', customerDetails, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // })
    //   .pipe(catchError(this.handleError));
    let params = new HttpParams().set("age", customerDetails.age.toString())
      .set("occupationRating", customerDetails.occupationRating)
      .set("sumInsured", customerDetails.sumInsured.toString());
    params.append("customerDetails", JSON.stringify(customerDetails));
    return this.http.get<number>(this.baseUrl + 'api/premiumCalculator', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
