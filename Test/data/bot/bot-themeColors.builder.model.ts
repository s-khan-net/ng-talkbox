import { IThemeColors } from "src/app/models/bot.model";

export class ThemeColorsBuilder {
    private constructor() { }
    private themePrimaryColor: string = '';
    private themeBoxShadowColor: string = '';
    private themeTextShadowColor: string = '';
    private themeHoverBackGroundColor: string = '';
    private themeTextWrapperColor: string = '';

    public static newThemeColor(): ThemeColorsBuilder {
        return new ThemeColorsBuilder();
    }

    public static anyThemeColor(): ThemeColorsBuilder {
        return new ThemeColorsBuilder()
            .withPrimaryColor('#EEE')
            .withBoxShadowColor('#CCC')
            .withTextShadowColor('#DDD')
            .withHoverBgColor('#EDEDE')
    }
    public withHoverBgColor(value: string): ThemeColorsBuilder {
        this.themeHoverBackGroundColor = value;
        return this;
    }
    public withTextShadowColor(value: string): ThemeColorsBuilder {
        this.themeTextShadowColor = value;
        return this;
    }
    public withBoxShadowColor(value: string): ThemeColorsBuilder {
        this.themeBoxShadowColor = value;
        return this;
    }
    public withPrimaryColor(value: string): ThemeColorsBuilder {
        this.themePrimaryColor = value;
        return this;
    }
    public withthemeTextWrapperColor(value: string): ThemeColorsBuilder {
        this.themeTextWrapperColor = value;
        return this;
    }

    public build(): IThemeColors {
        const themeColors: IThemeColors = {
            themePrimaryColor: this.themePrimaryColor,
            themeBoxShadowColor: this.themeBoxShadowColor,
            themeTextShadowColor: this.themeTextShadowColor,
            themeHoverBackGroundColor: this.themeHoverBackGroundColor,
            themeTextWrapperColor: this.themeTextWrapperColor
        };

        return themeColors;
    }
}