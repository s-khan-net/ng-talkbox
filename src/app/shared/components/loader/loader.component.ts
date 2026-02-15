import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false
})
export class LoaderComponent implements OnInit {

  constructor() { }
  @Input() public loaderMessage: string = '';
  @Input() public showLoader: boolean = false;
  @Input() public fullScreen: boolean = false;
  ngOnInit(): void {
  }

}
