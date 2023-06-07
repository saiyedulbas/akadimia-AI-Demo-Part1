export const IOS_APP_DOWNLOAD_LINK = "https://apps.apple.com/us/app/akadimia-ai/id1604169673";
// export const ANDROID_APP_DOWNLOAD_LINK = "";
export const PERIODS_LIST = [
    '2000-1901 B.C.',
    '1900-1801 B.C.',
    '1800-1701 B.C.',
    '1700-1601 B.C.',
    '1600-1501 B.C.',
    '1500-1401 B.C.',
    '1400-1301 B.C.',
    '1300-1201 B.C.',
    '1200-1101 B.C.',
    '1100-1001 B.C.',
    '1000-1001 B.C.',
    '900-801 B.C.',
    '800-701 B.C.',
    '700-601 B.C.',
    '600-501 B.C.',
    '500-401 B.C.',
    '400-301 B.C.',
    '300-201 B.C.',
    '200-101 B.C.',
    '100-1 B.C.',
    
    '1-100 A.D.',
    '101-200 A.D.',
    '201-300 A.D.',
    '301-400 A.D.',
    '401-500 A.D.',
    '501-600 A.D.',
    '601-700 A.D.',
    '701-800 A.D.',
    '801-900 A.D.',
    '901-1000 A.D.',
    '1001-1100 A.D.',
    '1101-1200 A.D.',
    '1201-1300 A.D.',
    '1301-1400 A.D.',
    '1401-1500 A.D.',
    '1501-1600 A.D.',
    '1601-1700 A.D.',
    '1701-1800 A.D.',
    '1801-1900 A.D.',
    '1901-2000 A.D.',
    '2001-Present'
]

export interface Timeline {
    period: string;
    description: string;
    characters?: Array<Character>;
    coverImgURL: string;
    political_events?: string,
    tech_advancements?: string,
    famine_and_natural_disasters?: string
}

export interface Character {
    id?: string;
    imgUrl: string;
    vidUrl: string;
    name: string;
    smallDescription: string;
    description: string;
    period: string;
    title?: string;
    customFields?: Array<CharacterCustomField>;
    lat?: number;
    lon?: number;
}

export interface CharacterCustomField {
    fieldName: string;
    fieldValue: string;
}
export interface Blogpost {
    id?: string;
    title: string;
    body: string;
    images: string[];
    readingMinutes: number;
    category: string;
    createdAt: number;
    createdBy?: string;   
    summary: string;
}

export interface User {
    uid: string;
    email: string;
    role: string;
    photoURL?: string;
    displayName?: string;
}

export interface QuoteForm {
    subject: string;
    name: string;
    email: string;
    messageSubject: string;
    phone?: string; 
    budget?: string;
    services?: string;
    website?: string;
    message: string;
}
export interface ContactForm {
    subject: string;
    name: string;
    email: string;
    messageSubject: string;
    phone?: string; 
    message: string;
}

export interface Question {
    q: string;
    a: string;
}

export interface MailChimpResponse {
    new_members: Array<any>;
    updated_members: Array<any>;
    errors: Array<MailChimpError>;
    total_created: number;
    total_updated: number;
    error_count: number;
}

export interface MailChimpError {
    email_address: string;
    error: string;
    error_code: string;
    field: string;
    field_message: string;
}