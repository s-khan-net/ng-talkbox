import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: false
})
export class ErrorComponent implements OnInit {
  @Input() public errorMessage: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
