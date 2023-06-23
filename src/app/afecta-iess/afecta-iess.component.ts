import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-afecta-iess',
  templateUrl: './afecta-iess.component.html',
  styleUrls: ['./afecta-iess.component.css']
})
export class AfectaIessComponent {
  afectaIESS: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getAfectaIESS()
  }
  
  getAfectaIESS(): void {
    this.http.get<any[]>('/api/Api/GetTrabaAfectaIESS').subscribe(
      data => {
        this.afectaIESS = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
