export interface IStore {
  name: string;
  _id: string;
}

export interface IMedicineData {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  numReviews: number;
  isFavorite: boolean;
  isCartItem: boolean;
  isNew?: boolean;
  count?: number;
  createdAt: Date;
}

export interface IOrderData {
  _id?: string;
  address: string;
  email: string;
  medicines: { medicine: string | IMedicineData; count: number | undefined }[];
  phone: string;
  totalPrice: string;
  username: string;
  createdAt?: Date;
}
