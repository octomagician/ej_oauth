import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Registrate } from '../../interface/registrate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css'
})
export class RegistrateComponent {
  form: FormGroup;
  mensaje: string = ''; //almacena el mensaje del back

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  registrate() {
    if (this.form.valid) {
      const usuario: Registrate = this.form.value;

      this.authService.registrate(usuario).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje;
          console.log(this.mensaje);

          alert('Registro exitoso');
          this.router.navigate(['iniciar_sesion']);
        },
        error: (error) => {
          this.mensaje = error.error.mensaje || 'Error al registrarse';
          alert(this.mensaje);
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

}
