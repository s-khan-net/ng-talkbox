import { IStartUpParams } from "src/app/models/bot.model";

export class StartUpParamsBuilder {

    private constructor() { }

    private startIconRounded: boolean = false;
    private startIconBackground: string = '';
    private startIconShadow: { required: boolean, style: string } = { required: false, style: '' };
    private startIconSize: { height: number, width: number } = { height: 175, width: 175 };
    private starIconPicture: string = '';
    private startIconPosition: { left: boolean, bottom: number } = { left: false, bottom: 10 };
    private startIconText: string = '';
    private startIconDelay: number = 2;

    public static newStartUps(): StartUpParamsBuilder {
        return new StartUpParamsBuilder();
    }

    public static anyStartUps(): StartUpParamsBuilder {
        return new StartUpParamsBuilder()
            .withRounded(false)
            .withBg('')
            .withShadow({ required: false, style: '' })
            .withPic('')
            .withPosition({ left: true, bottom: 10 })
            .withText('wassup')
            .withDelay(2)
    }
    public withDelay(value: number): StartUpParamsBuilder {
        this.startIconDelay = value;
        return this;
    }
    public withText(value: string): StartUpParamsBuilder {
        this.startIconText = value;
        return this;
    }
    public withPosition(value: any): StartUpParamsBuilder {
        this.startIconPosition = value;
        return this;
    }
    public withPic(value: string): StartUpParamsBuilder {
        this.starIconPicture = value;
        return this;
    }
    public withShadow(value: any): StartUpParamsBuilder {
        this.startIconShadow = value;
        return this;
    }
    public withBg(value: string): StartUpParamsBuilder {
        this.startIconBackground = value;
        return this;
    }
    public withRounded(value: boolean): StartUpParamsBuilder {
        this.startIconRounded = value;
        return this;
    }

    public build(): IStartUpParams {
        const startUps: IStartUpParams = {
            startIconRounded: this.startIconRounded,
            startIconBackground: this.startIconBackground,
            startIconShadow: this.startIconShadow,
            startIconSize: this.startIconSize,
            starIconPicture: this.starIconPicture,
            startIconPosition: this.startIconPosition,
            startIconText: this.startIconText,
            startIconDelay: this.startIconDelay
        };
        return startUps;
    }
}