import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from './../../services/blog.service';
import { Blogpost } from 'src/app/akadimia';
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-blog-post',
  templateUrl: './view-blog-post.component.html',
  styleUrls: ['./view-blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewBlogPostComponent implements OnInit {
  blogId: any  = 'whoaa';
  post!: Blogpost;
  allSubs$: Subscription[] = []
  html: any;
  constructor(private route:ActivatedRoute, private blogsApi: BlogService, private router: Router, private renderer: Renderer2, private sanitizer: DomSanitizer) {

   }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.blogsApi.getBlogById(this.blogId).subscribe(b => {
      this.post = b;
      this.html = this.sanitizer.bypassSecurityTrustHtml(b.body) ;
    })
  }

  ngAfterViewInit() {
    // 
  }

  seeAllBlogs() {
    this.router.navigate(["blogs"])
  }

  ngOnDestroy() {
    this.allSubs$.forEach(sub => sub.unsubscribe())
  }
}
