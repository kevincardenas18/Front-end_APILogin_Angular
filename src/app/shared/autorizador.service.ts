import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizadorService {
  private _sesionIniciada: boolean = false;

  get sesionIniciada(): boolean {
    return this._sesionIniciada;
  }

  set sesionIniciada(value: boolean) {
    this._sesionIniciada = value;
}
}