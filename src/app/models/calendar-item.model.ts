export interface CalendarItem {
    id?: string;
    subjectNl: string;
    subjectEn?: string
    startsAt: Date;
    endsAt?: Date;
    descriptionNl?: string;
    descriptionEn?: string;
    visible: boolean;
    mutable: boolean;
}
