import { Component, Input, OnInit } from '@angular/core';
import { IBot, IConv } from 'src/app/models/bot.model';
import { botConvType, ConvTypes } from './bot-conv-type.enum';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConvEditModalComponent } from './conv-edit-modal/conv-edit-modal.component';

@Component({
  selector: 'app-bot-conv',
  templateUrl: './bot-conv.component.html',
  styleUrls: ['./bot-conv.component.scss']
})
export class BotConvComponent implements OnInit {

  @Input() public bot!: IBot;
  public convTypes: any = ConvTypes;
  public conv: any = [];

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.conv = this.bot.conv || [];
  }

  public editConvItem(item: IConv): void {
    const modalRef = this._modalService.open(ConvEditModalComponent,
      {
        ariaLabelledBy: 'edit-conv',
        scrollable: true,
        windowClass: 'modal-class'
      });
    // const modalComponent: ConvEditModalComponent = modalRef.componentInstance;

    modalRef.componentInstance.fromParent = item;

    modalRef.result.then((result: any) => {
      console.log(result)
    }, (closed) => { console.log(closed); });
  }
}
