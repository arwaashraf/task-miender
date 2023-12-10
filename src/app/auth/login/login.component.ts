import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  remember = new FormControl(false);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
    remember: this.remember,
  });

  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitting = true;
    const { email, password, remember } = this.loginForm.value;
    this.authService
      .login(email ?? '', password ?? '', remember ?? false)
      .subscribe((res) => {
        this.router.navigate(['layout', 'tasks']);
      });
  }
}
