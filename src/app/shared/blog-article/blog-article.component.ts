import { DomSanitizer } from '@angular/platform-browser';
import { Blogpost } from './../../akadimia';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  @Input() post!: Blogpost;
  @Input() openPost!: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  
}
