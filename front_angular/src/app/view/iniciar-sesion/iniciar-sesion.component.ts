import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interface/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  form: FormGroup;
  mensaje: string = ''; //almacena el mensaje del back

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  ingresarBoton() {
    console.log("Se hizo click en ingresar");
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;

      this.authService.ingresar(usuario).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje;
          console.log(this.mensaje);
          console.log('Token:', response.token);
          alert('Inicio de sesión exitoso');
          localStorage.setItem('token', response.token);
          this.router.navigate(['']);
        },
        error: (error) => {
          this.mensaje = error.error.mensaje || 'Error al iniciar sesión';
          alert(this.mensaje);
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  onGoogleLogin() {
    console.log('Google login clicked');
    // TODO: Implement Google sign-in logic
  }

  registrate() {
    this.router.navigate(['registrate']);
  }
}
