/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { IProduct } from '@/components/marketplace/dashboard/pages/products/types';
import { ProductUser } from '@/components/products/types';
import {
  BrandCount,
  CategoryCore,
  CurrencyCode,
  DeleteProductMeta,
  ProductCore,
  ProductListResponse,
  ProductListType,
} from '@/types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'lodash';

interface InitialState {
  productListResponse:ProductListResponse
  confirmDelete:DeleteProductMeta
  productListCurrentPage:number
  productToEdit:IProduct
  categories:CategoryCore[]
  userProducts:ProductUser[]
  userProductsMeta:{
    itemsShowing:number,
    totalItems:number,
    totalPages:number,
  }
  currentPage:number
  brandCount:Array<BrandCount>
  singleProduct:ProductCore
  selectedSize:string
  selectedColor:string
  sizeNotSelected: boolean
  colorNotSelected:boolean
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
    totalPages: 0,
  },
  currentPage: 1,
  brandCount: [],
  singleProduct: {
    _id: '',
    name: '',
    price: 0,
    currencyCode: CurrencyCode.currencyCode,
    description: '',
    image: {
      url: '',
      secure_url: '',
    },
    images: [],
    category: '',
    brand: '',
    ratings: 0,
    numberOfReviews: 0,
    sellerId: '',
    shopId: {
      _id: '',
      name: '',
      logo: {
        url: '',
        secure_url: '',
      },
      description: '',
      address: '',
      owner: '',
      email: '',
    },
    reviews: [],
    sizes: [],
    color: '',
    gender: '',
    isDiscontinued: false,
    keywords: [],
    updatedAt: '',
    createdAt: '',
    stock: 0,
  },
  selectedSize: '',
  selectedColor: '',
  sizeNotSelected: false,
  colorNotSelected: false,
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
    addSingleProduct: (state, action:PayloadAction<ProductCore>) => {
      state.singleProduct = action.payload;
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
    addProductsMeta: (state, action:PayloadAction<any>) => {
      state.userProductsMeta = action.payload;
    },
    addCurrentPage: (state, action:PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addBrandCount: (state, action:PayloadAction<BrandCount[]>) => {
      state.brandCount = [...action.payload];
    },
    addProductSize: (state, action:PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
    addProductColor: (state, action:PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
    addSizeNotSelectedError: (state, action:PayloadAction<boolean>) => {
      state.sizeNotSelected = action.payload;
    },
    addColorNotSelectedError: (state, action:PayloadAction<boolean>) => {
      state.colorNotSelected = action.payload;
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
  addProductsMeta,
  addCurrentPage,
  addBrandCount,
  addSingleProduct,
  addProductColor,
  addProductSize,
  addColorNotSelectedError,
  addSizeNotSelectedError,

} = productSlice.actions;
export default productSlice.reducer;
