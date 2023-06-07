import { Router } from '@angular/router';
import { Blogpost } from './../../akadimia';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogPosts: Blogpost[] = []
  constructor(private BlogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.BlogService.getAllBlogs().subscribe(x => this.blogPosts = x)
  }

  addBlog() {
    // const blogpost:Blogpost = {
    //   title: "This is a blogpost",
    //   body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in elementum nisi ut sit eleifend. Imperdiet tempus eu in pretium. Velit pretium dictum elit fames ut vitae. Hendrerit lectus mauris vel, tortor condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in elementum nisi ut sit eleifend. Imperdiet tempus eu in pretium. Velit pretium dictum elit fames ut vitae. Hendrerit lectus mauris vel, tortor condimentum",
    //   createdAt: Date.now()
    // }
    // this.BlogService.addBlogpost(blogpost)
  }

  openPost = (id: any) => {
    this.router.navigate([`blog/${id}`]);
  }
}
