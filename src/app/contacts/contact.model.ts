export interface Contact {
  id: string;
  icon: string;
  isPersonal: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  favoritesRanking: number | null;
  phone: Phone;
  address: Address;
  notes: string;
}

export interface Phone {
  phoneNumber: string;
  phoneType: string;
}

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  addressType: string;
}

export interface IPhoneType {
  title: string;
  value: string;
}

export interface IAddressType {
  title: string;
  value: string;
}
