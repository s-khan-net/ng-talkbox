
export interface IBot {
    _id?: string;
    active?: boolean;
    name: string;
    description?: string;
    created?: Date;
    modified?: Date;
    createdBy?: string;
    modifiedBy?: string;
    conv?: IConv[];
    startUpParams?: IStartUpParams;
    talkBoxParams?: ITalkboxParams;
    themeColors?: IThemeColors;
    referrers?: string[];
    canEdit?: boolean;
    canAssign?: boolean;
}
export interface ITalkboxParams {
    logoText: string;
    headerColor: string;
    headerText: string;
    closeButton: boolean;
    talkboxBackGround: string;
}
export interface IThemeColors {
    themePrimaryColor: string, //background color of items
    themeBoxShadowColor: string, //box shadow color of items
    themeTextShadowColor: string, //text shadow color of items
    themeHoverBackGroundColor: string, //button hover color of items and text result color
    themeTextWrapperColor: string, //button hover color of items and text result color
}
export interface IStartUpParams {
    startIconRounded: boolean;
    startIconBackground: string;
    startIconShadow: { required: boolean, style: string };
    startIconSize: { height: number, width: number };
    starIconPicture: string;
    startIconPosition: { left: boolean, bottom: number };
    startIconText: string;
    startIconDelay: number
}

export interface IConv {
    id: string;
    text: string;
    type: botType;
    responseValidation?: string;
    options?: any;
    waitForReply: boolean
}

export interface IBotInputDTO {
    name: string;
    description: string,
    conv: IConv[];
    createdBy: string,
    modifiedBy: string
}

export enum botType {
    TEXT = 'text',
    MEETING = 'meeting',
    MULTI = 'multi',
    RATING = 'rating',
    OPTION = 'option',
}