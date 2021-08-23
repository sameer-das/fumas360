import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nikhil-fe';
}

const Menu = {
  modules: [
    {
      name: 'Accounts',
      submodules: [
        {
          submodulename: 'Reports',
          childmodule: ['chhildmodule1', 'chhildmodule2'],
        },
        {
          submodulename: 'Settings',
          childmodule: ['chhildmodule1', 'chhildmodule2'],
        },
        {
          submodulename: 'Transactions',
          childmodule: ['chhildmodule1', 'chhildmodule2'],
        },
      ],
    },
    { name: 'Admin tools', submodules: [] },
    { name: 'Flights', submodules: [] },
    { name: 'Tools', submodules: [] },
  ],
};
