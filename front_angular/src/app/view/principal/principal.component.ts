import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal',
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  mensaje: string = ''; //almacena el mensaje del back

  constructor(private authService: AuthService, private router: Router) {}

  salir() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No hay sesión activa.');
      this.router.navigate(['/iniciar_sesion']);
      return;
    }

    this.authService.salir(token).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        console.log(this.mensaje);

        localStorage.removeItem('token');
        alert('Se ha cerrado sesión');
        
        this.router.navigate(['/iniciar_sesion']);
      },
      error: (error) => {
        this.mensaje = error.error.mensaje || 'Error al cerrar sesión';
        alert(this.mensaje);
      }
      });
    }
}
