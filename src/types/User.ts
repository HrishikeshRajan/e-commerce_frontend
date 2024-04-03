import { Address } from './Orders';

export interface IUser {
  _id:string
  fullname: string
  username: string
  email: string
  photo?: {
    id: string
    secure_url: string
    url: string
  }
  address?:Address[]
  seller:boolean
  role:string
}

export interface IAddress {
  fullname: string
  city: string
  homeAddress: string
  state: string
  postalCode: string
  phoneNo: string
  country: string
  _id:string
  isPrimary:boolean
  isDefault:boolean
}
