import { Component, OnInit } from '@angular/core';
import loginDetails from 'src/assets/auth/login.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get formData() {
    return this.form.controls;
  }

  onSubmit() {
    const payload = {
      username: this.formData.username.value,
      password: this.formData.password.value
    };
    this.login(payload);
  }

  login(payload: {username, password}){
    const user = payload;
    const userDetail = loginDetails.filter(detail => {
                          if (detail.email === user.username && detail.password === user.password ) {
                            return detail;
                          }
                        });
    if (userDetail.length === 0 && userDetail === []) {
      console.error('Wrong username or email');
    } else if (userDetail.length !== 0 && userDetail !== [] && userDetail[0].role === 'ADMIN') {
      localStorage.setItem('user', JSON.stringify(userDetail));
      this.router.navigate(['/admin']);
    } else if (userDetail.length !== 0 && userDetail !== [] && userDetail[0].role === 'USER') {
      localStorage.setItem('user', JSON.stringify(userDetail));
      this.router.navigate(['/']);
    }
  }
}

