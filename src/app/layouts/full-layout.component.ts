import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  constructor() { }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public auth:string;
  public storeId: string;

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('currentAuth');
    this.storeId = sessionStorage.getItem('currentStore');
  }
}
