import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environment';
import { Email } from 'email';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  sendEmail({ name, email, message }: Email): Promise<Object> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    return this.http.post(environment.email.url, formData).toPromise();
  }
}
