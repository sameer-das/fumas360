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
  
  modules = this._loginService.module_data;
  isLoadng$!: Observable<boolean>;
  private _showLoaderEvents$!:Observable<boolean>;
  private _hideLoaderEvents$!:Observable<boolean>;

  ngOnInit(): void {
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
