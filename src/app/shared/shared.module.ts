import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ScrollRotateComponent } from './scroll-rotate/scroll-rotate.component';
import { AkButtonComponent } from './ak-button/ak-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EllipseCarouselComponent } from './ellipse-carousel/ellipse-carousel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './footer/footer.component';
import { TimelineCardComponent } from './timeline-card/timeline-card.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    NavbarComponent,
    CarouselComponent,
    ScrollRotateComponent,
    AkButtonComponent,
    EllipseCarouselComponent,
    FooterComponent,
    TimelineCardComponent,
    BlogArticleComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    // MATERIAL MODULES
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatAutocompleteModule,
    ScrollingModule,
    CKEditorModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  exports: [NavbarComponent,
    CarouselComponent,
    ScrollRotateComponent,
    AkButtonComponent,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    EllipseCarouselComponent,
    FooterComponent,
    TimelineCardComponent,
    BlogArticleComponent,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
     FormsModule,
     MatOptionModule,
     MatSelectModule,
     MatSidenavModule,
     MatAutocompleteModule,
     ReactiveFormsModule,
     ScrollingModule,
     MatSnackBarModule,
     MatProgressBarModule
    ]
})
export class SharedModule { }
