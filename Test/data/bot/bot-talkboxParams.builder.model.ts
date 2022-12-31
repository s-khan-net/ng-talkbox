import { ITalkboxParams } from "src/app/models/bot.model";

export class TalkboxParamsBuilder {
    private constructor() { }
    private logoText: string = '';
    private headerColor: string = '';
    private headerText: string = '';
    private closeButton: boolean = false;
    private talkboxBackGround: string = '';

    public static newTalkBox(): TalkboxParamsBuilder {
        return new TalkboxParamsBuilder();
    }

    public static anyTalkBox(): TalkboxParamsBuilder {
        return new TalkboxParamsBuilder()
            .withLogoText('W')
            .withHeaderColor('#DDD')
            .withHeaderText('TALKBOX')
            .withCloseButton(true)
            .withBg('#FFF')
    }
    public withBg(value: string): TalkboxParamsBuilder {
        this.talkboxBackGround = value;
        return this;
    }
    public withCloseButton(value: boolean): TalkboxParamsBuilder {
        this.closeButton = value;
        return this;
    }
    public withHeaderText(value: string): TalkboxParamsBuilder {
        this.headerText = value;
        return this;
    }
    public withHeaderColor(value: string): TalkboxParamsBuilder {
        this.headerColor = value;
        return this;
    }
    public withLogoText(value: string): TalkboxParamsBuilder {
        this.logoText = value;
        return this;
    }

    public build(): ITalkboxParams {
        const talkBox: ITalkboxParams = {
            logoText: this.logoText,
            headerColor: this.headerColor,
            headerText: this.headerText,
            closeButton: this.closeButton,
            talkboxBackGround: this.talkboxBackGround
        };

        return talkBox;
    }
}