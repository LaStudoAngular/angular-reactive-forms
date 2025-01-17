import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Contact, IAddressType, IPhoneType } from './contact.model';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private readonly http: HttpClient) {}

  public getContact(id: string): Observable<Contact | undefined> {
    return this.http.get<Contact>(`api/contacts/${id}`).pipe(
      map((c) => {
        const dob = c.dateOfBirth ? new Date(c.dateOfBirth) : null;

        return { ...c, dateOfBirth: dob };
      })
    );
  }

  public getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('api/contacts');
  }

  public saveContact(contact: Partial<Contact>): Observable<Contact> {
    const headers = { headers: { 'Content-Type': 'application/json' } };

    if (!contact.id || contact.id === '') {
      const newContact: Partial<Contact> = { ...contact, id: nanoid(5) };

      return this.http.post<Contact>('api/contacts/', newContact, headers);
    }

    return this.http.put<Contact>('api/contacts/', contact, headers);
  }

  public phoneTypes: IPhoneType[] = [
    { title: 'Mobile', value: 'mobile' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
  ];

  public addressTypes: IAddressType[] = [
    { title: 'Home', value: 'home' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
  ];
}
