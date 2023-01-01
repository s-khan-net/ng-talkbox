import { Component, Input, OnInit } from '@angular/core';
import { botType, IBot, IConv } from 'src/app/models/bot.model';
import { botConvType, ConvTypes } from './bot-conv-type.enum';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConvEditModalComponent } from './conv-edit-modal/conv-edit-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-bot-conv',
  templateUrl: './bot-conv.component.html',
  styleUrls: ['./bot-conv.component.scss']
})
export class BotConvComponent implements OnInit {

  @Input() public bot!: IBot;
  public convTypes: any = ConvTypes;
  public conv: any = [];

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  ngOnInit(): void {
    this.conv = _.cloneDeep(this.bot.conv || []);
  }

  public editConvItem(item: IConv): void {
    console.log('edit conv', this.bot.conv)
    let sz = 'sm';
    if(item.type == botType.OPTION) {
      sz='lg'
    }
    const modalRef = this._modalService.open(ConvEditModalComponent,
      {
        ariaLabelledBy: 'edit-conv',
        scrollable: true,
        windowClass: 'modal-class',
        size: sz
      });
    // const modalComponent: ConvEditModalComponent = modalRef.componentInstance;

    modalRef.componentInstance.fromParent = item;
    modalRef.componentInstance.conv = this.bot.conv;

    modalRef.result.then((result: any) => {
      console.log(result)
    }, (dismissObj) => { 
      if(dismissObj)
        this.bot.conv = dismissObj;
        this.conv = _.cloneDeep(this.bot.conv);
    });
  }
}
