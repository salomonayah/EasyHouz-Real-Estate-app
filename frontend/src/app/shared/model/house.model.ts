export interface House {
  houseId: string;
  imageUrl: string;
  title: string;
  price: number;
  location: string;
  advantage: string;
  description: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HouseList {
  announcements: House[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}


