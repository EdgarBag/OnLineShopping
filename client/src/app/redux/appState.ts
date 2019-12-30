import { Product } from '../models/product';
import { User } from '../models/user';
import { Category } from '../models/category';


export class AppState {
    public products: Product[] = [];
    public user: User;
    public categories: Category[] = [];
    public product = new Product;
}