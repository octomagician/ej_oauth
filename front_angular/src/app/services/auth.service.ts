import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';
import { Registrate } from '../interface/registrate';
import { UsuarioInfo } from '../interface/usuario-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = environment.endpoint;

  constructor(private http: HttpClient) {}
  ingresar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.endpoint}ingresar`, usuario);
  }

  registrate(usuario: Registrate): Observable<any> {
    return this.http.post(`${this.endpoint}usuarios`, usuario);
  }

  salir(token:string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.endpoint}salir`, {}, { headers });
  }

  obtenerInfoUsuario(token: string): Observable<UsuarioInfo> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<UsuarioInfo>(`${this.endpoint}usuario-info`, { headers });
  }
}