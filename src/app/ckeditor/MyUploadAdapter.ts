import { UploadAdapter } from './UploadAdapter.interface';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { last, switchMap, finalize } from "rxjs";
import { take } from "rxjs/internal/operators/take";

export class MyUploadAdapter implements UploadAdapter {
    loader: any;
    storage: AngularFireStorage;
    db: AngularFirestore;

    task!: AngularFireUploadTask;
    path: any
    file: any;
    imageUploadProgress: any;
    snapshot: any;
    downloadURL: any;
    storageRef!: import("@angular/fire/compat/storage").AngularFireStorageReference;

    constructor(loader: any, storage: any, db: any) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.storage = storage;
        this.db = db;
    }

    // Starts the upload process.


    upload(): Promise<UploadResponse> {
        return this.loader.file.then((file: File) => new Promise<UploadResponse>((resolve, reject) => {

                this.path = 'images/blogs/'+ `${file.name}_${Date.now()}`
                this.task = this.storage.upload(this.path , file);
                this.storageRef = this.storage.ref(this.path);

                this.task.percentageChanges().subscribe((x:any) => {
                    this.imageUploadProgress = x
                    this.loader.uploadedTotal = x;    
                })
                
                this.task.snapshotChanges().pipe(
                    finalize(() => {
                        this.storageRef.getDownloadURL().subscribe(downloadURL => {
                        resolve({default: downloadURL})
                      });
                    })
                  ).subscribe()
                }))
    }

    // Aborts the upload process.
    abort() {
        // Reject the promise returned from the upload() method.
        this.task.cancel()
    }
}


interface UploadResponse {
    default: string
}