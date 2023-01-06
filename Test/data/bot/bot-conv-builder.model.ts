import { IConv } from "src/app/models/bot.model";

export class ConvBuilder {
    private constructor() { }

    private id: string = '';
    private text: string = '';
    private type: convType = convType.TEXT;
    private responseValidation?: string;
    private options?: any;
    private waitForReply: boolean = false;



    public static newConv(): ConvBuilder {
        return new ConvBuilder();
    }

    public static anyConv(): ConvBuilder {
        return new ConvBuilder()
            .withConvId('0')
            .withConvText('')
            .withConvType(convType.TEXT)
            .withresponseValidation('none')
            .withOptions({})
            .withWait(false)
    }
    public withWait(value: boolean): ConvBuilder {
        this.waitForReply = value;
        return this;
    }
    public withOptions(value: any): ConvBuilder {
        this.options = value;
        return this;
    }
    public withresponseValidation(value: string): ConvBuilder {
        this.responseValidation = value;
        return this;
    }
    public withConvType(value: convType): ConvBuilder {
        this.type = value;
        return this;
    }
    public withConvText(value: string): ConvBuilder {
        this.text = value;
        return this;
    }
    public withConvId(value: string): ConvBuilder {
        this.id = value;
        return this;
    }

    public build(): IConv {
        const conv: IConv = {
            id: this.id,
            text: this.text,
            type: this.type,
            responseValidation: this.responseValidation,
            options: this.options,
            waitForReply: this.waitForReply
        };

        return conv;
    }
}
export enum convType {
    TEXT = 'text',
    MEETING = 'meeting',
    MULTI = 'multi',
    RATING = 'rating',
    OPTION = 'option',
}