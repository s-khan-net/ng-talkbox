import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: false
})
export class ConfirmModalComponent{

  constructor(@Optional() private readonly activeModal: NgbActiveModal) { }

  @Input() public confirmationBoxTitle: string = '';
  @Input() public confirmationMessage: string = '';

  public confirm(res: boolean) {
    this.activeModal.close(res);
  }

}
