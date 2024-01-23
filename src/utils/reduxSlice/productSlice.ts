/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { IProduct } from '@/components/marketplace/dashboard/pages/products/types';
import { ProductUser } from '@/components/products/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove, merge } from 'lodash';

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

interface ProductListResponse {
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

type Query = ProductQuery;
interface InitialState {
  productListResponse:ProductListResponse
  confirmDelete:DeleteProductMeta
  productListCurrentPage:number
  productToEdit:IProduct
  categories:CategoryCore[]
  userProducts:ProductUser[]
  userProductsMeta:{
    itemsShowing:number,
    totalItems:number
  }
  currentPage:number
  productQuery:Query
}

type DeleteProductMeta = {
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
const initialState:InitialState = {
  productListResponse: {
    itemsShowing: 0,
    totalItems: 0,
    products: [],
  },
  confirmDelete: {
    confirm: false,
    name: '',
    productId: '',
    title: '',
    info: '',
    bulk: false,
  },
  productListCurrentPage: 1,
  productToEdit: {
    name: '',
    price: 0,
    currencyCode: '',
    description: '',
    category: '',
    brand: '',
    sizes: '',
    color: '',
    gender: '',
    isDiscontinued: false,
    keywords: '',
    id: '',
    shopId: '',
    stock: 0,
  },
  categories: [],
  userProducts: [],
  userProductsMeta: {
    itemsShowing: 0,
    totalItems: 0,
  },
  currentPage: 1,
  productQuery: {
    brand: [],
    color: [],
    category: '',
    page: 0,
    'price[gte]': '0',
    'price[lte]': '0',

  },
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    addProductsList: (state, action:PayloadAction<ProductListResponse>) => {
      state.productListResponse.itemsShowing = action.payload.itemsShowing;
      state.productListResponse.totalItems = action.payload.totalItems;
      state
        .productListResponse
        .products = action.payload.products;
    },
    removeProductFromListById: (state) => {
      const id = state.confirmDelete.productId;
      if (!state.productListResponse) return;
      remove(state.productListResponse.products, (prod:ProductListType) => prod._id === id);
    },
    confirmDelete: (state, action:PayloadAction<DeleteProductMeta>) => {
      state.confirmDelete = action.payload;
    },
    incNextProductPageNumber: (state) => {
      state.productListCurrentPage += 1;
    },
    decPreviousProductPageNumber: (state) => {
      state.productListCurrentPage -= 1;
    },
    addProductToEdit: (state, action:PayloadAction<IProduct>) => {
      state.productToEdit = action.payload;
    },
    addCategories: (state, action:PayloadAction<CategoryCore[]>) => {
      state.categories = action.payload;
    },
    addProducts: (state, action:PayloadAction<ProductUser[]>) => {
      state.userProducts = [...action.payload];
    },
    updateProducts: (state, action:PayloadAction<ProductUser[]>) => {
      const products = [...state.userProducts];
      const set = new Set();

      products.map((pro) => set.add(pro._id));

      for (let index = 0; index < action.payload.length; index++) {
        if (!set.has(action.payload[index]._id)) {
          products.push(action.payload[index]);
        }
      }

      state.userProducts = [...products];
    },
    addProductsMeta: (state, action:PayloadAction<any>) => {
      state.userProductsMeta = action.payload;
    },
    addCurrentPage: (state, action:PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addProductQuery: (state, action:PayloadAction<ProductQuery>) => {
      merge(state.productQuery, action.payload);
      state.productQuery = { ...state.productQuery };
    },
  },
});

export const {
  addProductsList,
  confirmDelete,
  removeProductFromListById,
  incNextProductPageNumber,
  decPreviousProductPageNumber,
  addProductToEdit,
  addCategories,
  addProducts,
  updateProducts,
  addProductsMeta,
  addCurrentPage,
  addProductQuery,
} = productSlice.actions;
export default productSlice.reducer;
