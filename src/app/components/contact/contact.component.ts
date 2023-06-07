import { UiService } from './../../services/ui.service';
import { QuoteForm, ContactForm } from './../../akadimia';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from './../../services/email.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArrayName, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  detective: any;
  gotcha: boolean = true;

  emailSuccess: boolean = false;
  currentFormType!: string | null;
  
  Data: Array<any> = [
    { name: 'Request a new character', value: 'Request a new character' },
    { name: 'Other', value: 'Other' },
  ];

  Budget: Array<any> = [
    { name: '$1,000 - 2,000', value: '$1,000 - 2,000' },
    { name: '$2,000 - $5,000', value: '$2,000 - $5,000' },
    { name: '$5,000 - $10,000', value: '$5,000 - $10,000' },
    { name: '$20,000 - $50,000', value: '$20,000 - $50,000' },
    { name: '$50,000 - $100,000', value: '$50,000 - $100,000' },
    { name: '> $100,000', value: '> $100,000' },

  ];

  contactUsForm: FormGroup<any> = new FormGroup({
    a_password: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.maxLength(20)]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    message: new FormControl('', [Validators.required]),
  });

  sendQuoteForm: FormGroup<any> = new FormGroup({
    a_password: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.maxLength(20)]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    message: new FormControl('', [Validators.required]),
    budget: new FormControl(''),
    website: new FormControl(''),
    services: new FormArray([])
  });


  constructor(private emailService: EmailService, private router: Router, private activatedRoute: ActivatedRoute, public uiService: UiService) {
   }

  ngOnInit(): void {
    this.currentFormType = this.activatedRoute.snapshot.paramMap.get('formType')
  }

  ngAfterViewInit() {
    this.detective = setTimeout(() => {
      this.gotcha = false;
    }, 3000);
  }

  onContactUs() {
    if (this.gotcha || this.contactUsForm.get('a_password')?.value != null) {
      return
    }

    this.emailSuccess = true
      let subject = 'Contact Us - Akidimia Website'
      let data: ContactForm = {
        name: this.name?.value,
        email: this.email?.value,
        phone: this.phone?.value,
        messageSubject: this.subject?.value,
        subject: subject,
        message: this.message?.value
      }
      this.emailService.sendContactUsEmail(subject, data).pipe(take(1)).subscribe(x => {
        if (x.success == true) {
          this.emailSuccess = true;
        }
    })
  }

  onSendQuote() {
    if (this.gotcha == true || this.sendQuoteForm.get('a_password')?.value != null) {
      return
    }
    
      let subject = 'Get Quote - Akidimia Website'
      let data: QuoteForm = {
        name: this.name_q?.value,
        email: this.email_q?.value,
        budget: this.budget?.value,
        website: this.website?.value,
        phone: this.phone_q?.value,
        messageSubject: this.subject_q?.value,
        subject: subject,
        services: JSON.stringify(this.services?.value),
        message: this.message_q?.value
      }
      this.emailService.sendQuoteEmail(subject, data).pipe(take(1)).subscribe(x => {
        if (x.success == true) {
          this.emailSuccess = true;
        }
    })
  }


  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.sendQuoteForm.get('services') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get a_password() { return this.contactUsForm.get('a_password'); }
  get name() { return this.contactUsForm.get('name'); }
  get email() { return this.contactUsForm.get('email'); }
  get phone() { return this.contactUsForm.get('phone'); }
  get subject() { return this.contactUsForm.get('subject'); }
  get message() { return this.contactUsForm.get('message'); }

  get a_password_q() { return this.sendQuoteForm.get('a_password'); }
  get name_q() { return this.sendQuoteForm.get('name'); }
  get email_q() { return this.sendQuoteForm.get('email'); }
  get phone_q() { return this.sendQuoteForm.get('phone'); }
  get subject_q() { return this.sendQuoteForm.get('subject'); }
  get message_q() { return this.sendQuoteForm.get('message'); }
  get budget() { return this.sendQuoteForm.get('budget'); }
  get services() { return this.sendQuoteForm.get('services'); }
  get website() { return this.sendQuoteForm.get('website'); }
}
