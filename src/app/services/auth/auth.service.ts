import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:5000/api/endpoint';

  registerApi() {
    const payload = {
      email: 'user@example.com',
      username: 'string',
      password: 'string',
    };

    this.http.post(this.url, payload).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
