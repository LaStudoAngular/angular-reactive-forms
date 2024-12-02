import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { Contact, IAddressType, IPhoneType } from '../contacts/contact.model';

type TypeTracker = IPhoneType | IAddressType;

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly contactsService: ContactsService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  public readonly phoneTypes = this.contactsService.phoneTypes;
  public readonly addressTypes = this.contactsService.addressTypes;

  public contactForm = this.fb.nonNullable.group({
    id: '',
    isPersonal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    }),
    notes: '',
  });

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService
      .getContact(contactId)
      .subscribe((contact: Contact | undefined) => {
        if (!contact) return;

        this.contactForm.setValue(contact);
      });
  }

  public saveContact(): void {
    /** Два способа получить значения вложенных (nested) полей формы */
    // this.contactForm.get('phone.phoneNumber')
    // this.contactForm.get(['phone', 'phoneNumber'])?.value

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }

  public typeTracker(_: number, type: TypeTracker): string {
    return type.title;
  }
}
