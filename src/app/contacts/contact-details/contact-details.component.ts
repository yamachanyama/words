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
deletedID: String;

ngOnInit(): void {
  this.getContact();
}

getContact(): void {
  const _id = this.route.snapshot.paramMap.get('id');
  if (_id == '0') {
    this.createNewContact();
  }
  else{
  this.contactService.getContact(_id)
    .then(contact => this.contact = contact);
  }
}

goBack(): void{
  this.location.back();
}

createNewContact() {
  this.contact = {
    word: '',
    meaning: '',
    NG: 'TRUE',
    createDate: ''
  };
}

createContact(): void {
  this.contactService.createContact(this.contact)
  .then(contact => this.contact = contact);
  this.goBack();
}

updateContact(): void {
  this.contactService.updateContact(this.contact)
  .then(contact => this.contact = contact);
  this.goBack();
}

deleteContact(): void {
  this.contactService.deleteContact(this.contact._id.toString())
  .then((deletedContactID: String) => this.deletedID = deletedContactID);
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
