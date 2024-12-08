import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { CreateUser } from '../../interfaces/create-user';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styles: ``,
})
export class CreateUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly createUserForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.alphanumericValidator(),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, this.ageValidator()]],
    genderId: ['', [Validators.required]],
  });
  protected loading = false;

  private alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const regex = /^[a-zA-Z0-9 ]*$/;

      return regex.test(control.value) ? null : { alphanumeric: true };
    };
  }

  private ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const birthDate = new Date(control.value);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return 18 <= age ? null : { underage: true };
    };
  }

  protected getFieldError(fieldName: keyof CreateUser): string {
    const control = this.createUserForm.get(fieldName);

    if (!control || !control.errors || !control.touched) return '';

    const errors = {
      required: 'Este campo es requerido',
      email: 'Correo electrónico inválido',
      minlength: `Mínimo ${control.errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${control.errors['maxlength']?.requiredLength} caracteres`,
      alphanumeric: 'Solo se permiten letras y números',
      underage: 'Debes ser mayor de 18 años',
    };

    const firstError = Object.keys(control.errors)[0];
    return errors[firstError as keyof typeof errors] || 'Campo inválido';
  }

  protected onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.toastService.error('Por favor, revisa los campos del formulario');
      return;
    }

    const formValue = this.createUserForm.value as CreateUser;
    const createUserData: CreateUser = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      birthDate: formValue.birthDate,
      genderId: formValue.genderId,
    };

    this.loading = true;

    this.userService
      .createUser(createUserData)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastService.success('Usuario creado exitosamente');
          this.router.navigate(['/user']);
        },
        error: (error: HttpErrorResponse) =>
          this.toastService.error(error.error.error),
      });
  }
}
