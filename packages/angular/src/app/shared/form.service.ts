import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  url = 'form/form.php';

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(APP_BASE_HREF)
    origin: string
  ) {
    if (!origin) return;

    this.url = `${origin}${this.url}`;
  }

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

    return this.http.post(this.url, formData).toPromise();
  }
}
