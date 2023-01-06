import { Component, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { convType, IBot, IConv } from 'src/app/models/bot.model';
import { ConvTypes } from './bot-conv-type.enum';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConvEditModalComponent } from './conv-edit-modal/conv-edit-modal.component';
import * as _ from 'lodash';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-bot-conv',
  templateUrl: './bot-conv.component.html',
  styleUrls: ['./bot-conv.component.scss']
})
export class BotConvComponent implements OnInit {

  @Input() public bot!: IBot;
  @ViewChild('confirmTemplate') public confirmTemplate: TemplateRef<any> | undefined;
  public convTypes: any = ConvTypes;
  public conv: any = [];
  public linkedQuestionHover: string = '';
  public confirmationBoxTitle: string = '';
  public confirmationMessage: string = '';

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
    if (item.type == convType.OPTION) {
      sz = 'lg'
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
      if (dismissObj)
        this.bot.conv = dismissObj;
      this.conv = _.cloneDeep(this.bot.conv);
    });
  }

  public deleteConvItem(item: IConv): void {
    let op: NgbModalOptions
    const modalRef = this._modalService.open(ConfirmModalComponent,
      {
        ariaLabelledBy: 'confirm delete',
        scrollable: true,
        windowClass: 'modal-class',
        size: 'sm',
      });
    modalRef.componentInstance.confirmationBoxTitle = 'Really!?';
    modalRef.componentInstance.confirmationMessage = 'Do you want to delete this question?';

    modalRef.result.then((deletion) => {
      console.log(`User's choice: ${deletion}`)
      if (deletion) {
        let id = item.id;
        this.conv.splice(this.conv.findIndex((c: any) => {
          return c.id == id;
        }), 1);
        let optionsTypes = this.conv.filter((c: any) => {
          return c.type == convType.OPTION;
        });
        optionsTypes.forEach((q: IConv) => {
          q.options.forEach((o: any) => {
            if (o.linkedQuestion == id) {
              delete o.linkedQuestion;
            }
          });
        });
        this.bot.conv = this.conv;
        this.conv = _.cloneDeep(this.bot.conv);
      }
    });
  }

  public hoverLinkedQuestion(linkedQuestion: string) {
    this.linkedQuestionHover = linkedQuestion;
  }
  public hoverOutLinkedQuestion() {
    this.linkedQuestionHover = '';
  }
}
