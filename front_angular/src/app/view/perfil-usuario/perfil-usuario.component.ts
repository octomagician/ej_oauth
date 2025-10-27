import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioInfo } from '../../interface/usuario-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  usuarioInfo: UsuarioInfo | null = null;
  loading = true;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarInfoUsuario();
  }

  cargarInfoUsuario(): void {
    // Intentar obtener el token de los parámetros de la URL primero
    let token = this.route.snapshot.queryParams['token'];
    
    // Si no está en la URL, buscarlo en localStorage
    if (!token) {
      token = localStorage.getItem('token');
    }
    
    // Intentar obtener la información del usuario de los parámetros de la URL
    const userParam = this.route.snapshot.queryParams['user'];
    
    if (userParam) {
      try {
        // Decodificar y parsear la información del usuario de la URL
        const decodedUser = decodeURIComponent(userParam);
        const userData = JSON.parse(decodedUser);
        
        // Mapear los datos del usuario al formato esperado
        this.usuarioInfo = {
          email: userData.correo || userData.email,
          foto: userData.avatar || userData.foto
        };
        
        // Guardar el token en localStorage para futuras consultas
        if (token) {
          localStorage.setItem('token', token);
        }
        
        this.loading = false;
        return;
      } catch (error) {
        console.error('Error al parsear la información del usuario de la URL:', error);
        // Si hay error parseando, continúa con la consulta a la API
      }
    }
    
    // Si no hay parámetros en la URL o hay error, usar la API
    if (!token) {
      this.error = 'No hay token de autenticación';
      this.loading = false;
      return;
    }

    this.authService.obtenerInfoUsuario(token).subscribe({
      next: (data: UsuarioInfo) => {
        this.usuarioInfo = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar información del usuario:', error);
        this.error = 'Error al cargar la información del usuario';
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}