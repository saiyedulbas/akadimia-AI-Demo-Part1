import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from './../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharactersApiService } from './../../services/characters-api.service';
import { Character, PERIODS_LIST } from './../../akadimia';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Component, OnInit, ViewChild, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { tap } from 'rxjs/internal/operators/tap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, finalize, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-add-character-page',
  templateUrl: './add-character-page.component.html',
  styleUrls: ['./add-character-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCharacterPageComponent implements OnInit {
  @ViewChild('characterPhoto') characterPhotoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('characterVideo') characterVideoInput!: ElementRef<HTMLInputElement>;

  @ViewChild('characterPhotoPreview') characterPhotoPreview!: ElementRef<HTMLImageElement>;
  @ViewChild('characterVideoPreview') characterVideoPreview!: ElementRef<HTMLVideoElement>;

  isEditing: boolean = false;

  characterForm!: FormGroup;

  // characterName: string = '';
  // characterSmallDescription: any = '';
  // characterDescription: string = '';
  // characterEra: string = '';

  periodsList = PERIODS_LIST;

  imageUploadProgress: any = 0;
  videoUploadProgress: any = 0;


  characterBeingEdited!: Character;

  file!: any;
  videoFile!: any;

  path!: any;
  videoPath!: any;


  task!: AngularFireUploadTask;
  videoTask!: AngularFireUploadTask;

  snapshot: any;
  videoSnapshot: any;

  allCharacters: Character[] = [];

  constructor(private storage: AngularFireStorage,
    private db: AngularFirestore,
    private CharactersApi: CharactersApiService,
    private renderer: Renderer2,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      characterName: this.formBuilder.control(''),
      characterSmallDescription: this.formBuilder.control(''),
      characterDescription: this.formBuilder.control(''),
      characterEra: this.formBuilder.control(''),
      customFields: this.formBuilder.array([this.createCustomFieldFormGroup()]),
      imgUrl: this.formBuilder.control(''),
      vidUrl: this.formBuilder.control('')
    })
    this.CharactersApi.getAllCharacters().subscribe(list => this.allCharacters = list)

  }

  uploadFile(event: any) {

    let n = Date.now();
    // const file = event.target.files[0];
    this.file = event.target.files[0];
    this.path = 'images/characters/' + `${this.file.name}_${Date.now()}`
    // const task = this.storage.upload(filePath, file);
    this.renderer.setAttribute(this.characterPhotoPreview.nativeElement, "src", URL.createObjectURL(this.file))
  }

  uploadVideo(event: any) {
    let n = Date.now();
    // const file = event.target.files[0];
    this.videoFile = event.target.files[0];
    this.videoPath = 'videos/characters/' + `${this.videoFile.name}_${Date.now()}`
    // const task = this.storage.upload(filePath, file);
    this.renderer.setAttribute(this.characterVideoPreview.nativeElement, "src", URL.createObjectURL(this.videoFile))
  }

  // createCharacter() {
  //   // console.log(this.characterForm.value)
  // }
  createCharacter() {
    let uploadTaskList: Array<AngularFireUploadTask> = []
    let snapShotList: Array<Observable<any>> = []
    let percentageChangesList: Array<Observable<any>> = []

    if (this.file) {
      this.task = this.storage.upload(this.path, this.file);
      uploadTaskList.push(this.task)
      this.task.percentageChanges().subscribe(n => this.imageUploadProgress = n);

    }
    if (this.videoFile) {
      this.videoTask = this.storage.upload(this.videoPath, this.videoFile);
      uploadTaskList.push(this.videoTask)
      this.videoTask.percentageChanges().subscribe(n => this.videoUploadProgress = n);
    }
    
    
    for (let task of uploadTaskList) {
      //get all snapshots
      snapShotList.push(task.snapshotChanges())
      //get all percentage changes
      percentageChangesList.push(task.percentageChanges())
    }


    forkJoin([...snapShotList]).subscribe(async (snaps: any) => {
      let isReady = true;
      for (let snap of snaps) {
        if (snap!.bytesTransferred != snap!.totalBytes) isReady = false;
      }

      if (isReady) {
        // upload image url on firestore
        let imgUrl = await snaps[0].ref.getDownloadURL();
        let vidUrl = ''
        if (snaps[1]) {
          vidUrl = await snaps[1].ref.getDownloadURL();
        }
        
        const newCharacter: Character = {
          name: this.characterName.value,
          period: this.characterEra.value,
          smallDescription: this.characterSmallDescription.value,
          description: this.characterDescription.value,
          customFields: this.customFields.value,
          imgUrl: imgUrl,
          vidUrl: vidUrl
        }
        
        
        this.db.collection('characters').add(newCharacter).then(() => {
          this.snackbarService.showSnackbar('Created character', 'close')
          // // console.log('created character')
        })
      }
    })

  }

  async deleteCharacter(id: any, imgPath: string, videoPath: any) {
    this.CharactersApi.deleteCharacterById(id, imgPath, videoPath).then(() => {
      this.snackbarService.showSnackbar('Deleted character', 'close')
    })
  }

  editCharacter(character: Character) {
    let vidUrl: any = character.vidUrl
    let imgUrl: any = character.imgUrl

    this.isEditing = true;

    this.characterBeingEdited = character;
    this.characterForm.controls['characterName'].setValue(character.name);
    this.characterForm.controls['characterEra'].setValue(character.period);
    this.characterForm.controls['characterSmallDescription'].setValue(character.smallDescription || "");
    this.characterForm.controls['characterDescription'].setValue(character.description|| "");

    if (character.customFields) {
      while(this.customFields.length) {this.customFields.removeAt(0)}
      character.customFields?.forEach(f => this.customFields.push(this.formBuilder.group(f)))
      // this.characterForm.setControl('customFields', this.formBuilder.array(character.customFields || []));
    }


    this.renderer.setAttribute(this.characterVideoPreview.nativeElement, "src", vidUrl)
    this.renderer.setAttribute(this.characterPhotoPreview.nativeElement, "src", imgUrl)

    this.file = imgUrl;
    this.videoFile = vidUrl;
  }

  updateCharacter() {
    this.characterBeingEdited.name = this.characterName.value
    this.characterBeingEdited.period = this.characterEra.value;

    this.characterBeingEdited.smallDescription = this.characterSmallDescription.value;
    this.characterBeingEdited.description = this.characterDescription.value;
    this.characterBeingEdited.customFields = this.customFields.value
    
    let toDeletePaths: string[];
    let snapShots: Observable<any>[] = [];

    let hasImageChanged = (!(this.characterBeingEdited.imgUrl != undefined && this.characterBeingEdited.imgUrl.includes(this.path)) && this.path != null)
    let hasVideoChanged = (!(this.characterBeingEdited.vidUrl != undefined && this.characterBeingEdited.vidUrl.includes(this.videoPath)) && this.videoPath != null)
    
    if (hasImageChanged == true) {
      this.task = this.storage.upload(this.path, this.file);
      snapShots.push(this.task.snapshotChanges())
    }

    if (hasVideoChanged == true) {
      this.videoTask = this.storage.upload(this.videoPath, this.videoFile);
      snapShots.push(this.videoTask.snapshotChanges())
    }


    if (hasImageChanged || hasVideoChanged) {

      forkJoin(snapShots).subscribe(async snaps => {
        if (hasImageChanged &&
          hasVideoChanged &&
          snaps[0].bytesTransferred >= snaps[0].totalBytes &&
          snaps[1].bytesTransferred >= snaps[1].totalBytes
        ) {
          let imgUrl = await snaps[0].ref.getDownloadURL()
          let vidUrl = await snaps[1].ref.getDownloadURL()


          if (this.characterBeingEdited.imgUrl) {
            this.storage.refFromURL(this.characterBeingEdited.imgUrl).delete()
          }
          if (this.characterBeingEdited.vidUrl) {
            this.storage.refFromURL(this.characterBeingEdited.vidUrl).delete()
          }

          this.characterBeingEdited.imgUrl = imgUrl;
          this.characterBeingEdited.vidUrl = vidUrl;

          this.db.doc(`characters/${this.characterBeingEdited.id}`).update(this.characterBeingEdited).then(() => {
            this.isEditing = false;
            this.clearFileList();
            this.clearVideoList();
            this.snackbarService.showSnackbar('Updated character', 'close')
          })

        } else if (hasImageChanged && snaps[0].bytesTransferred >= snaps[0].totalBytes) {
          let imgUrl = await snaps[0].ref.getDownloadURL()

          if (this.characterBeingEdited.imgUrl) {
            this.storage.refFromURL(this.characterBeingEdited.imgUrl).delete()
          }
          this.characterBeingEdited.imgUrl = imgUrl;

          this.db.doc(`characters/${this.characterBeingEdited.id}`).update(this.characterBeingEdited).then(() => {
            this.isEditing = false;
            this.clearFileList();
            this.clearVideoList();
            this.snackbarService.showSnackbar('Updated character', 'close')
          })

        } else if ( hasVideoChanged && snaps[0].bytesTransferred >= snaps[0].totalBytes) {
          
          // let isReady = true;
          // for (let snap of snaps) {
          //   if (snap!.bytesTransferred != snap!.totalBytes) isReady = false;
          // }

          let vidUrl = await snaps[0].ref.getDownloadURL()
          if (this.characterBeingEdited.vidUrl) {
            this.storage.refFromURL(this.characterBeingEdited.vidUrl).delete()
          }
          this.characterBeingEdited.vidUrl = vidUrl;
          debugger
          this.db.doc(`characters/${this.characterBeingEdited.id}`).update(this.characterBeingEdited).then(() => {
            this.isEditing = false;
            this.clearFileList();
            this.clearVideoList();
            this.snackbarService.showSnackbar('Updated character', 'close')
          })

        }
      })
    } else {
      this.db.doc(`characters/${this.characterBeingEdited.id}`).update({ ...this.characterBeingEdited }).then(x => {
        this.isEditing = false;
        this.clearFileList();
        this.clearVideoList();
        this.snackbarService.showSnackbar('Updated character', 'close')
      })
    }

  }

  removeSelectedPhoto() {
    this.file = null
    this.renderer.setAttribute(this.characterPhotoPreview.nativeElement, "src", "")
    this.characterPhotoInput.nativeElement.value = "";
  }

  removeSelectedVideo() {
    this.videoFile = null
    this.renderer.setAttribute(this.characterVideoPreview.nativeElement, "src", "")
    this.characterVideoInput.nativeElement.value = "";
  }

  clearFileList() {
    this.characterPhotoInput.nativeElement.value = "";
    this.renderer.setAttribute(this.characterPhotoPreview.nativeElement, "src", "")
    this.file = null;
    this.path = null;
  }

  clearVideoList() {
    this.characterVideoInput.nativeElement.value = "";
    this.renderer.setAttribute(this.characterVideoPreview.nativeElement, "src", "")
    this.videoFile = null;
    this.videoPath = null;
  }

  createCustomFieldFormGroup() {
    return new FormGroup({
      'fieldName': new FormControl('', Validators.required),
      'fieldValue': new FormControl('', Validators.required)
    })  
  }
  
  addCustomField() {
    this.customFields.push(this.createCustomFieldFormGroup())
  }

  deleteCustomField(index: number) {
    this.customFields.removeAt(index);
  }

  get characterName() {
    return this.characterForm.controls['characterName']
  }
  set characterName(v) {
    this.characterName.setValue(v)
  }


  get characterEra() {
    return this.characterForm.controls['characterEra']
  }
  set characterEra(v) {
    this.characterEra.setValue(v)
  }
  

  get characterSmallDescription() {
    return this.characterForm.controls['characterSmallDescription']
  }
  set characterSmallDescription(v) {
    this.characterSmallDescription.setValue(v)
  }


  get characterDescription() {
    return this.characterForm.controls['characterDescription']
  }
  set characterDescription(v) {
    this.characterDescription.setValue(v)
  }


  get customFields() {
    return this.characterForm.controls["customFields"] as FormArray;
  }
  // getAllCharacters():Observable {
  //   return this.CharactersApi.getAllCharacters()
  // }
  // getImage(imagePath: string) {
  //   const p = 'https://firebasestorage.googleapis.com/v0/b/akadimia-angular.appspot.com/o/images%2Ffirewatch_wallpaper.jpg_1658173589525?alt=media&token=375870ae-2414-481c-b37d-987dd7aabe17'
  //   return p
  // }

  // onFileSelected(event: any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           // console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         // console.log(url);
  //       }
  //     });
  // }

}
