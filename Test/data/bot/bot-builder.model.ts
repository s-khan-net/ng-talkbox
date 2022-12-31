import { ConvBuilder } from './bot-conv-builder.model';
import { StartUpParamsBuilder } from './bot-startUpParams-builder.model';
import { TalkboxParamsBuilder } from './bot-talkboxParams.builder.model';
import { ThemeColorsBuilder } from './bot-themeColors.builder.model';
import { IBot, IConv, IStartUpParams, ITalkboxParams, IThemeColors } from 'src/app/models/bot.model';
export class BotBuilder {
    private constructor() {
    }
    private _id?: string;
    private active?: boolean;
    private name: string = '';
    private description?: string;
    private created?: Date;
    private modified?: Date;
    private createdBy?: string;
    private modifiedBy?: string;
    private conv: IConv[] = [];
    private startUpParams?: IStartUpParams;
    private talkBoxParams?: ITalkboxParams;
    private themeColors?: IThemeColors;
    private referrers: string[] = [];
    private canEdit?: boolean;
    private canAssign?: boolean;

    public static newBot(): BotBuilder {
        return new BotBuilder();
    }
    public static anyBot(): BotBuilder {
        return new BotBuilder()
            .withBotId('1')
            .withBotActive(true)
            .withBotName('rick')
            .withBotDesc('Bot description')
            // .withBotCreated(new Date(2021, 09, 11))
            // .withBotModified(new Date(2021, 09, 11))
            .withBotCreatedBy('rick')
            .withBotModifiedBy('rick')
            .withBotConv(ConvBuilder.anyConv().build())
            .withStartParams(StartUpParamsBuilder.anyStartUps().build())
            .withTalkBoxParams(TalkboxParamsBuilder.anyTalkBox().build())
            .withThemeColors(ThemeColorsBuilder.anyThemeColor().build())
            .withReferrers([''])
            .withCanEdit(true)
            .withCanAssign(true)
    }
    public withCanAssign(value: boolean): BotBuilder {
        this.canAssign = value;
        return this;
    }
    public withCanEdit(value: boolean): BotBuilder {
        this.canEdit = value;
        return this;
    }
    public withReferrers(value: string[]): BotBuilder {
        this.referrers = value;
        return this;
    }
    public withThemeColors(value: IThemeColors): BotBuilder {
        this.themeColors = value;
        return this;
    }
    public withTalkBoxParams(value: ITalkboxParams): BotBuilder {
        this.talkBoxParams = value;
        return this;
    }
    public withStartParams(value: IStartUpParams): BotBuilder {
        this.startUpParams = value;
        return this;
    }
    public withBotConv(value: IConv): BotBuilder {
        this.conv = [value];
        return this;
    }

    public withBotId(value: string): BotBuilder {
        this._id = value;
        return this;
    }

    public withBotActive(value: boolean): BotBuilder {
        this.active = value;
        return this;
    }

    public withBotName(value: string): BotBuilder {
        this.name = value;
        return this;
    }

    public withBotDesc(value: string): BotBuilder {
        this.description = value;
        return this;
    }

    public withBotCreated(value: Date): BotBuilder {
        this.created = value;
        return this;
    }

    public withBotModified(value: Date): BotBuilder {
        this.modified = value;
        return this;
    }

    public withBotCreatedBy(value: string): BotBuilder {
        this.createdBy = value;
        return this;
    }

    public withBotModifiedBy(value: string): BotBuilder {
        this.modifiedBy = value;
        return this;
    }

    public build(): IBot {
        const bot: IBot = {
            _id: this._id,
            active: this.active,
            name: this.name,
            description: this.description,
            created: this.created,
            modified: this.modified,
            createdBy: this.createdBy,
            modifiedBy: this.modifiedBy,
            conv: this.conv,
            startUpParams: this.startUpParams!,
            talkBoxParams: this.talkBoxParams!,
            themeColors: this.themeColors!,
            referrers: this.referrers,
            canEdit: this.canEdit!,
            canAssign: this.canAssign!
        };

        return bot;
    }
}
