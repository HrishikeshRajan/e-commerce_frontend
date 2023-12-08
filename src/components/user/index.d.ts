export interface IAddress {
  fullname: string
  city: string
  homeAddress: string
  state: string
  postalCode: string
  phoneNo: string
  country: string
  _id:string
}
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
  address?:IAddress[]
  seller:boolean
  role:string
}
export type FetchResponse =
{ successMsg:string;
  isSuccess:boolean;
};
