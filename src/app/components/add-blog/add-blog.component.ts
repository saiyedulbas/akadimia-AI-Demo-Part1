import { SnackbarService } from './../../services/snackbar.service';
import { BlogService } from './../../services/blog.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from 'src/app/ckeditor/MyUploadAdapter';
import { Blogpost } from 'src/app/akadimia';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})

export class AddBlogComponent implements OnInit {
  public Editor = ClassicEditor;
  public editorConfig = {extraPlugins: [  ]}
  id: any = '';
  blogContent: any = '';
  postTitle: string = '';
  postCategory: string = '';
  postSummary: string = '';
  added: boolean = false;
  blogPosts!: Blogpost[];
  
  isEditing: boolean = false;
  previousImages: string[] = [];

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private blogService: BlogService, private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe(x => this.blogPosts = x)
  }

  onReady(editor: any): void {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader: any ) => {
      return new MyUploadAdapter( loader, this.storage, this.db);
    };
  }

  wordCount(str: string) { 
    return str.split(" ").length;
  }

  postBlog() {
    let images: any[] = []
    const node = new DOMParser().parseFromString(this.blogContent, "text/html")
    let elArray = node.getElementsByTagName('img')
    for (let i = 0; i < elArray.length; i++) {
       images.push(elArray[i].getAttribute('src'))
    }
    
    let minutes = Math.floor(this.wordCount(this.blogContent)/238)

    let post: Blogpost = {
        title: this.postTitle,
        body: this.blogContent,
        category: this.postCategory,
        readingMinutes: minutes > 1 ? minutes: 1,
        createdAt: Date.now(),
        images: images,
        summary: this.postSummary
    }

    // console.log(post)
    this.blogService.addBlogpost(post).then((v) => {
      this.added = true;
      this.previousImages = []
      this.isEditing = false;
      this.blogContent = ""
      this.postTitle = ""
      this.postCategory = ""
      this.postSummary = ""
      this.snackBar.showSnackbar('Added new post', 'close')
    })
  }

  // deletePostById() {
  //   this.blogService.deleteBlogpostById()
  // }
  onEditorChange(e: any) {
    // // console.log(e)
  }

  editPost(p: Blogpost) {
    this.previousImages = this.blogService.getImageUrls(p.body);
    this.isEditing = true;
    this.blogContent = p.body
    this.postTitle = p.title
    this.postCategory = p.category;
    this.postSummary = p.summary;
    this.id = p.id;
  }

  cancelEditing() {
    this.previousImages = []
    this.isEditing = false;
    this.blogContent = ""
    this.postTitle = ""
    this.postCategory = ""
    this.postSummary = ""
  }

  updateBlogPost() {

    let images = this.blogService.getImageUrls(this.blogContent)

    let imagesToDelete = []
    for (let prevImg of this.previousImages) {
      if (images.includes(prevImg) == false) {
        imagesToDelete.push(prevImg)
      }
    }
    
    let minutes = Math.floor(this.wordCount(this.blogContent)/238)

    let post: Blogpost = {

        title: this.postTitle,
        body: this.blogContent,
        category: this.postCategory,
        readingMinutes: minutes > 1 ? minutes: 1,
        createdAt: Date.now(),
        images: images,
        summary: this.postSummary
    }

    // // console.log(post)
    this.blogService.updateBlogpost(this.id, post, imagesToDelete).then((v) => {
      this.added = true;
      imagesToDelete = [];
      this.isEditing = false;
      this.snackBar.showSnackbar('Updated blog post', 'close')
    })
  }

  deletePost(p: Blogpost) {
    this.blogService.deleteBlogpost(p).then(() => {
      this.snackBar.showSnackbar('Delete blog post', 'close')
      // // console.log('done')
    })
  }
}
