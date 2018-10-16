import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environment';
import { Email } from 'email';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  sendEmail(email: Email): Promise<Object> {
    return this.http.post(environment.email.url, email).toPromise();
  }
}
