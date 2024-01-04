/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { IProduct } from '@/components/marketplace/dashboard/pages/products/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'lodash';

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
interface InitialState {
  productListResponse:ProductListResponse
  confirmDelete:DeleteProductMeta
  productListCurrentPage:number
  productToEdit:IProduct
}

type DeleteProductMeta = {
  confirm:boolean
  name:string
  productId:string
  title:string
  info:string
  bulk:boolean
};

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
  },
});

export const {
  addProductsList,
  confirmDelete,
  removeProductFromListById,
  incNextProductPageNumber,
  decPreviousProductPageNumber,
  addProductToEdit,
} = productSlice.actions;
export default productSlice.reducer;
