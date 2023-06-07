export interface UploadAdapter {
    upload() : Promise<any>;
    abort() : void;
}