export class Product {
    public constructor(
        public _id?: string,
        public name?: string,
        public category?: { _id?: string; categoryName?: string },
        public priceOfProduct?: string,
        public nameOfimgOfProduct?: File,
        public countOfAllProducts?: number,
        public amount?: number,
    ) { }
}