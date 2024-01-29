export enum CurrencyCode { currencyCode = 'INR' }

export interface Photo {
  url: string
  secure_url: string
}
export interface Image {
  url: string
  secure_url: string
  _id:string
}

export interface Review {
  _id:string
  title: string
  description: string
  star: number
  userId: string
  date: Date
}

export interface ProductCore {
  _id:string
  name: string
  price: number
  currencyCode: CurrencyCode
  description: string
  image: Photo
  images: Array<Image>
  category: string
  brand: string
  ratings: number
  numberOfReviews: number
  sellerId: string
  shopId: ShopCore
  reviews: Array<Review>
  sizes: Array<string>
  color: string
  gender: string
  isDiscontinued: boolean
  keywords: Array<string>
  updatedAt: string
  createdAt: string
  stock:number
}

export interface ShopCore {
  _id:string
  name: string
  logo: Photo,
  description: string
  address: string
  owner: string
  email:string
}
