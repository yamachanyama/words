import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';

@Injectable()
export class ContactService {

    private contactsUrl1 = '/api/contacts';
    private contactsUrl2 = '/api/contact';
    private searchUrl = '/api/search';
    private countUrl = '/api/count';

    /*
    private contactsUrl = '/assets/contactdata.json';
*/

    constructor (private http: Http) {}
    // get("/api/contacts/:skip")
    getContacts(skip: number): Promise<Contact[]> {
      return this.http.get(this.contactsUrl1 +'/' + skip.toString())
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }
    // get("/api/contacts/:keyword")
    getContacts_search(keyword: String): Promise<Contact[]> {
      return this.http.get(this.searchUrl + '/' + keyword)
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }
    getContacts_count(): Promise<number> {
      return this.http.get(this.countUrl)
                 .toPromise()
                 .then(response => response.json() as number)
                 .catch(this.handleError);
    }

/*
    getContacts():Promise<Contact[]> {
      return ()=>this.contactdata;
    }
*/
    // post("/api/contact")
    createContact(newContact: Contact): Promise<Contact> {
      return this.http.post(this.contactsUrl2, newContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // get("/api/contact/:id") endpoint not used by Angular app
    getContact(getContactID: String): Promise<Contact> {
      return this.http.get(this.contactsUrl2+ '/' + getContactID)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // put("/api/contact/:id")
    updateContact(putContact: Contact): Promise<Contact> {
      var putUrl = this.contactsUrl2 + '/' + putContact._id;
      return this.http.put(putUrl, putContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }
    
    // delete("/api/contact/:id")
    deleteContact(delContactId: String): Promise<String> {
      return this.http.delete(this.contactsUrl2 + '/' + delContactId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    private handleError (error: any){
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}