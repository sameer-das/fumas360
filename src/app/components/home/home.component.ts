import { Component, OnInit } from '@angular/core';
import { menu } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modules = menu.data.modules;
   constructor() { }

  ngOnInit(): void {
    // console.log(menu.data.modules);a
  }
  show:boolean = false;

}
