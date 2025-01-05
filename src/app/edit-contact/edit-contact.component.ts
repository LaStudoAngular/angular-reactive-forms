import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import {
  Contact,
  IAddressType,
  IPhoneGroup,
  IPhoneType,
} from '../contacts/contact.model';
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
    phones: this.fb.array<FormGroup<IPhoneGroup>>([]),
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

        // динамически добавляем в form array контролы из модели
        contact.phones.forEach(() => this.addPhoneControl());

        // заполняем все контролы формы данными из модели
        this.contactForm.setValue(contact);
      });
  }

  public addPhoneControl(): void {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
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

  // создаем контрол формы с телефоном
  private createPhoneGroup(): FormGroup<IPhoneGroup> {
    return this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    });
  }
}
