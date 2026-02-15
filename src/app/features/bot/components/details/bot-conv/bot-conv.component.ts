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
  styleUrls: ['./bot-conv.component.scss'],
  standalone: false
})
export class BotConvComponent implements OnInit {

  @Input() public bot!: IBot;
  @ViewChild('confirmTemplate') public confirmTemplate: TemplateRef<any> | undefined;
  public convTypes: any = ConvTypes;
  public conv: any = [];
  public linkedQuestionHover: string = '';
  public nextQuestionHover: string = '';
  public confirmationBoxTitle: string = '';
  public confirmationMessage: string = '';

  public themePrimaryColor: any;
  public themeBoxShadowColor: any;
  public themeTextShadowColor: any;
  public themeHoverBackGroundColor: any;
  public optionBoxShadow: any;
  public optionTextShadow: any;

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  ngOnInit(): void {
    this.conv = _.cloneDeep(this.bot.conv || []);
    this.themePrimaryColor = this.bot?.themeColors?.themePrimaryColor;
    this.themeBoxShadowColor = this.bot?.themeColors?.themeBoxShadowColor;
    this.themeTextShadowColor = this.bot?.themeColors?.themeTextShadowColor;
    this.themeHoverBackGroundColor = this.bot?.themeColors?.themeHoverBackGroundColor;
    this.optionBoxShadow = `1px 3px 9px 0px ${this.themeBoxShadowColor}`;
    this.optionTextShadow = `0px 1px 0px ${this.themeTextShadowColor}`;
  }

  public editConvItem(item: IConv): void {
    const modalRef = this._modalService.open(ConvEditModalComponent,
      {
        ariaLabelledBy: 'edit-conv',
        scrollable: true,
        windowClass: 'modal-class',
        size: 'lg'
      });

    modalRef.componentInstance.fromParent = item;
    modalRef.componentInstance.conv = this.bot.conv;
    modalRef.componentInstance.optionBoxShadow = this.optionBoxShadow;
    modalRef.componentInstance.themePrimaryColor = this.themePrimaryColor;

    modalRef.result.then((result: any) => {
      console.log(result)
    }, (dismissObj) => {
      if (dismissObj)
        this.bot.conv = dismissObj;
      this.conv = _.cloneDeep(this.bot.conv);
    });
  }

  public addConvItem(type: any): void {
    let item: IConv;
    let convTemp = _.cloneDeep(this.bot.conv) || [];
    const lastitem: IConv = convTemp[convTemp.length - 1]
    let id: string = '0';
    if (lastitem) {
      id = (Number(lastitem.id) + 1).toString()
    };
    item = { id: id, text: '', type: type?.convType, waitForReply: true };
    if (type?.convType == convType.TEXT) {
      item.responseValidation = type?.name?.toLowerCase()
    }
    if (type?.convType == convType.OPTION) {
      item.options = [{ text: 'option1', value: '0' }];
    }
    this.conv.push(item);
    const modalRef = this._modalService.open(ConvEditModalComponent,
      {
        ariaLabelledBy: 'add-conv',
        scrollable: true,
        windowClass: 'modal-class',
        size: 'lg'
      });

    modalRef.componentInstance.fromParent = item;
    modalRef.componentInstance.conv = this.conv;
    modalRef.componentInstance.optionBoxShadow = this.optionBoxShadow;
    modalRef.componentInstance.themePrimaryColor = this.themePrimaryColor;

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

  public hoverNextQuestion(nextQuestion: string) {
    this.nextQuestionHover = nextQuestion;
  }
  public hoverOutNextQuestion() {
    this.nextQuestionHover = '';
  }
}
