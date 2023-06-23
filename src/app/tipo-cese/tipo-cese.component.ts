import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipo-cese',
  templateUrl: './tipo-cese.component.html',
  styleUrls: ['./tipo-cese.component.css']
})
export class TipoCeseComponent {
  tipoCese: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoCese()
  }
  
  getTipoCese(): void {
    this.http.get<any[]>('/api/Api/GetTipoCese').subscribe(
      data => {
        this.tipoCese = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
