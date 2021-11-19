import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: [ './header-one.component.scss' ]
} )
export class HeaderOneComponent implements OnInit {

  show: boolean = false;

  constructor() { }

  ngOnInit (): void {
  }

  toogleMenu () {
    this.show = !this.show;
  }

}
