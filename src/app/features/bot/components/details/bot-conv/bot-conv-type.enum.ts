
export enum botConvType {
    TEXT = 'text',
    OPTION = 'option',
    MULTI = 'multi',
    RATING = 'rating',
    MEETING = 'meeting',
}

export const ConvTypes = [
    { abbr: 'T', name: 'TEXT', desc: 'Display text' },
    { abbr: 'N', name: 'NUMERIC', desc: 'Accept a numeric field from the user' },
    { abbr: 'O', name: 'OPTIONS', desc: 'A set of options for the user to choose from' },
    { abbr: 'C', name: 'CHOICES', desc: 'A set of choices for the user to choose more than one' },
    { abbr: 'E', name: 'EMAIL', desc: 'Accept a valid email from the user' },
    { abbr: 'R', name: 'RATING', desc: 'Present a rating selection' },
    { abbr: 'M', name: 'MEETING', desc: 'A Calander for the user to select a date & time' },
    { abbr: 'D', name: 'DATE', desc: 'A Calander for the user to select a date' },
];