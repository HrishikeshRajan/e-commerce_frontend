export interface IUser {
  fullname: string
  username: string
  email: string
  photo?: {
    id: string
    secure_url: string
    url: string
  }
}
