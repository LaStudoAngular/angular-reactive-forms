import { FormControl } from '@angular/forms';

export interface Contact {
  id: string;
  icon: string;
  isPersonal: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  favoritesRanking: number | null;
  phones: Phone[];
  addresses: Address[];
  notes: string;
}

export interface Phone {
  phoneNumber: string;
  phoneType: string;
}

export interface IPhoneGroup {
  phoneNumber: FormControl<string>;
  phoneType: FormControl<string>;
}

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  addressType: string;
}

export interface IAddressGroup {
  streetAddress: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<string>;
  addressType: FormControl<string>;
}

export interface IPhoneType {
  title: string;
  value: string;
}

export interface IAddressType {
  title: string;
  value: string;
}
