export interface IAddress extends Document {
  fullname: string;
  city: string;
  homeAddress: string;
  state: string;
  postalCode: string;
  phoneNo: string;
  country: string;
  _id:string
}
export interface ClientUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  photo: {
    id: string;
    secure_url: string;
    url: string;
  };
  gender?: string;
  address?: IAddress[];
  emailVerified: boolean;
  isPrimeUser: boolean;
  seller?: boolean;
}
