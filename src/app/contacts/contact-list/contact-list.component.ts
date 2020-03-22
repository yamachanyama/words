import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
// import { of } from 'rxjs';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  contacts: Contact[];
  keyword: string;
  skip: number =0;
  count: number; //collectionsize

/*
  selectedContact: Contact
*/
  
  page=1;
  pageSize=10;//number of lists per a page
  maxSize=5;

  constructor(private contactService: ContactService) { }

  public observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) =>{
      this.contactService
       .getContacts((this.page-1)*this.pageSize)
        .then((contacts: Contact[]) => {
          this.contacts = contacts.map((contact) => {
            return contact;
          });
        });
      console.log("mutation happen ! page=" + this.page);
    });
  });
  private target:any;

  ngOnInit() {
    this.contactService
      .getContacts(this.skip)
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          /*
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            }
          }
          */
          return contact;
        });
        console.log(this.contacts);
      });

    this.contactService
      .getContacts_count()
      .then((Count: number) => this.count = Count);

    this.target = document.getElementById('sample');
    const opt:MutationObserverInit = {
      attributes: true,
      characterData: true
    };
    this.observer.observe(this.target,opt); // ここでhrefを監視

  }

  Search(){
    this.contactService
      .getContacts_search(this.keyword)
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          return contact;
        });
      });
  }

  /*
  NextContact(){
    console.log(this.page);
    this.contactService
      .getContacts((this.page-1)*this.pageSize)
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          return contact;
        });
        console.log("NextContact happen !");
      });
  */

  }


  /*
  selectContact(contact: Contact) {
    this.selectedContact = contact
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact.id === contactId;
    });
  }

  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
  */