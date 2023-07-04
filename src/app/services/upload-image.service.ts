import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhnoew5bj/upload';
  constructor(private http: HttpClient) {}

  uploadImg(img: File) {
    console.log(img);
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'ml_default');
    return this.http
      .post<any>(this.cloudinaryUrl, data, {
        headers: { skip: 'true' },
      })
      .pipe(map((response: any) => response));
  }
}
