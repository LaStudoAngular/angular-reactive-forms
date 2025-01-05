import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { Contact, IAddressType, IPhoneType } from '../contacts/contact.model';
import { restrictedWordsValidator } from '../validators/restricted-words.validator';

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
    icon: '',
    isPersonal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: ['', Validators.required],
    }),
    notes: ['', restrictedWordsValidator(['bad', 'ugly', 'stupid'])],
  });

  ngOnInit(): void {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService
      .getContact(contactId)
      .subscribe((contact: Contact | undefined) => {
        if (!contact) return;

        for (let i = 0; i < contact.phones.length - 1; i += 1) {
          this.addControl();
        }

        this.contactForm.setValue(contact);
      });
  }

  public addControl(): void {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  public get firstNameControl(): FormControl {
    return this.contactForm.get('firstName') as FormControl;
  }

  public get addressControl(): FormControl {
    return this.contactForm.get(['address']) as FormControl;
  }

  public get notesControl(): FormControl {
    return this.contactForm.get(['notes']) as FormControl;
  }

  public typeTracker(_: number, type: TypeTracker): string {
    return type.title;
  }

  public saveContact(): void {
    /** Три способа получить значения вложенных (nested) полей формы */
    // this.contactForm.get('phone.phoneNumber')
    // this.contactForm.get(['phone', 'phoneNumber'])?.value
    // this.contactForm.get('phone')?.get('phoneNumber')?.value

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }

  private createPhoneGroup() {
    return this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    });
  }
}
