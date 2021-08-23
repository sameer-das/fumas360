import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, UserAuthData } from 'src/app/shared/services/login.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginInvalid:boolean = false;

  constructor(private _router:Router, private _loginService:LoginService) {
    this.form = new FormGroup({
      userid: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    this._loginService.checkCredentials(this.form.value.userid, this.form.value.password)
    .subscribe((userAuthData: UserAuthData) => {
      console.log(userAuthData);
      if(userAuthData.success){
        localStorage.setItem('auth',userAuthData.jwt);
        this._router.navigate(['/dashboard']);
      }
      else{
        localStorage.removeItem('auth');
        alert(userAuthData.error) 
      }
    })
    
  }

}
