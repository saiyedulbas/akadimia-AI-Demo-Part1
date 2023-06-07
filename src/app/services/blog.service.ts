import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpsCallable } from '@firebase/functions';
import { Observable } from 'rxjs';
import { Blogpost, Character } from '../akadimia';
import { doc } from '@firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogCollection: any;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  getAllBlogs(): Observable<any[]> {
    const ref = this.db.collection('blog-posts')
    return ref.valueChanges({idField: 'id'})
  }

  getBlogById(id: string): Observable<Blogpost> {
    const ref = this.db.doc(`blog-posts/${id}`)
    return ref.valueChanges({idField: 'id'}) as Observable<Blogpost>
  }

  addBlogpost(blogpost: Blogpost) {
    return this.db.collection('blog-posts').add(blogpost)
  }

  updateBlogpost(id: any, blogpost: Blogpost, urlsToDelete: string[]) {
    urlsToDelete.forEach(url => {
      this.storage.refFromURL(url).delete()
    })
    return this.db.doc(`blog-posts/${id}`).update({...blogpost})
  }

  deleteBlogpostById(id: string, imgUrl: string) {
    this.storage.refFromURL(imgUrl).delete()
    return this.db.doc(`blog-posts/${id}`).delete()
  }

  deleteBlogpost(p: Blogpost) {
    // Delete all image URLS
    let urls = this.getImageUrls(p.body)
    urls.forEach(url => {
      this.storage.refFromURL(url).delete()
    })

    return this.db.doc(`blog-posts/${p.id}`).delete()
  }

  getImageUrls(body: string) {
    let images: any[] = []
    const node = new DOMParser().parseFromString(body, "text/html")
    let elArray = node.getElementsByTagName('img')
    for (let i = 0; i < elArray.length; i++) {
       images.push(elArray[i].getAttribute('src'))
    }

    return images
  }
}
