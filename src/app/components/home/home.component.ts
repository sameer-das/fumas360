import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _loginService: LoginService, private _router:Router) { }
  
  modules!: any[];
  loggedUserName: string | null = 'Anonymous';
  isLoadng$!: Observable<boolean>;
  private _showLoaderEvents$!:Observable<boolean>;
  private _hideLoaderEvents$!:Observable<boolean>;
  
  ngOnInit(): void {
    this.modules = JSON.parse(localStorage.getItem('fuma-menu')!);
    console.log(this.modules)
    this.loggedUserName = localStorage.getItem('fuma-user');


    this._showLoaderEvents$ = this._router.events.pipe(
      filter(e => e instanceof ResolveStart),
      mapTo(true)
    )

    this._hideLoaderEvents$ = this._router.events.pipe(
      filter(e => e instanceof ResolveEnd),
      mapTo(false)
    )
    this.isLoadng$ = merge(this._hideLoaderEvents$,this._showLoaderEvents$)
  }

}
