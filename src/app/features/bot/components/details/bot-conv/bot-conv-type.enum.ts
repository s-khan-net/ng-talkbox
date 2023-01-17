import { convType } from "src/app/models/bot.model";

export const ConvTypes = [
    { abbr: 'T', convType: convType.TEXT, name: 'TEXT', desc: 'Display text or accept a text value from the user' },
    { abbr: 'N', convType: convType.TEXT, name: 'NUMERIC', desc: 'Accept a numeric field from the user' },
    { abbr: 'E', convType: convType.TEXT, name: 'EMAIL', desc: 'Accept a valid email from the user' },
    { abbr: 'O', convType: convType.OPTION, name: 'OPTIONS', desc: 'A set of options for the user to choose from' },
    { abbr: 'C', convType: convType.MULTI, name: 'CHOICES', desc: 'A set of choices for the user to choose more than one' },
    { abbr: 'R', convType: convType.RATING, name: 'RATING', desc: 'Present a rating selection' },
    { abbr: 'M', convType: convType.MEETING, name: 'MEETING', desc: 'A Calander for the user to select a date & time' },
    { abbr: 'D', convType: convType.MEETING, name: 'DATE', desc: 'A Calander for the user to select a date' },
];