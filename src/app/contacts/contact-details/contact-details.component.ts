import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {

constructor (
    private contactService: ContactService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

contact: Contact;

ngOnInit(): void {
  this.getContact();
}

getContact(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  console.log(id);
  if (id == 0) {
    this.createNewContact();
  }
  else{
  this.contactService.getContact(id.toString())
    .then(contact => this.contact = contact);
  }
}

goBack(): void{
  this.location.back();
}

createNewContact() {
  this.contact = {
    id: 0,
    word: '',
    meaning: '',
    NG: 'TRUE',
    MEMENTO_ID: ''
  };
}

createContact(contact: Contact): void {
  this.contactService.createContact(contact);
  this.goBack();
}

updateContact(contact: Contact): void {
  this.contactService.updateContact(contact);
  this.goBack();
}

deleteContact(contactId: String): void {
  this.contactService.deleteContact(contactId);
  this.goBack();
}


/*
  @Input()
  contact: Contact;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }
  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }
  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
*/
  
}
