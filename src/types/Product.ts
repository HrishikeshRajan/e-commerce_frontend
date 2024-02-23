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

export interface ShopProductOrder {
  productId:string
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
  shopId: string
  reviews: Array<Review>
  sizes: Array<string>
  color: string
  gender: string
  isDiscontinued: boolean
  keywords: Array<string>
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

export interface ProductListType {
  _id: string;
  name: string;
  price: number;
  stock: number;
  ownerId: {
    _id: string;
    fullname: string;
  };
  shopId: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface ProductListResponse {
  itemsShowing:number
  totalItems:number
  products:ProductListType[]
}

export interface ProductQuery {
  brand?:string[],
  color?:string[],
  category?:string,
  page?:number,
  'price[gte]'?:string,
  'price[lte]'?:string

}

export type DeleteProductMeta = {
  confirm:boolean
  name:string
  productId:string
  title:string
  info:string
  bulk:boolean
};

export interface CategoryCore {
  _id: string
  name: string
  image: {
    secure_url: string
  },
  description: string
  updated: Date
  created: Date
  offer:string
}
export interface BrandCount {
  _id: {
    brand: string;
  };
  count: number;
}
