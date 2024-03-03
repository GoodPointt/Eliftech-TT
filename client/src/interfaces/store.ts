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
}

export interface IOrderData {
  address: string;
  email: string;
  medicines: { _id: string; count: number }[];
  phone: string;
  totalPrice: number;
  username: string;
}
