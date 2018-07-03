import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'form/form.php';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  sendEmail({
    name,
    email,
    message
  }: {
    name: string;
    email: string;
    message: string;
  }): Promise<Object> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    return this.http.post(url, formData).toPromise();
  }
}
