export interface IAddress {
  fullname: string
  city: string
  homeAddress: string
  state: string
  postalCode: string
  phoneNo: string
  country: string
}
export interface IUser {
  fullname: string
  username: string
  email: string
  photo?: {
    id: string
    secure_url: string
    url: string
  }
  address?:IAddress[]
}
