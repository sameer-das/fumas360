import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input('module') module: any;
  @Input('isChild') isChild:boolean = false;
  constructor(private _router:Router,private _activatedRoute:ActivatedRoute) { }

  expand_child:boolean = false;
  

  ngOnInit(): void {
  }

  onClick(name:string) {
    if(this.isChild && !this.module.children) {
      const path = name.toLowerCase().split(' ').join('-');
      console.log(`Child link clicked, navigate here to ${path}`);
      this._router.navigate([path],{relativeTo: this._activatedRoute});
    } else {
      this.expand_child = !this.expand_child;
    }

  }


}



