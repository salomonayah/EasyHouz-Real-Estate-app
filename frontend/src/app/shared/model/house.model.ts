import { User } from '../../auth/model/auth.model';

export interface House {
  pictureUrl: string;
  title: string;
  price: number;
  location: string;
  advantage: string;
  description: string;
  seller?: User;
}
