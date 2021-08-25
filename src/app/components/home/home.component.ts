import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { menu } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _loginService: LoginService) { }
  
  modules = this._loginService.module_data;

  ngOnInit(): void {
    // console.log(menu.data.modules);a
  }
  show:boolean = false;

}
