import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @Input()
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
