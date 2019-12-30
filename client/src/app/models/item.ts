export class Item {
    public constructor(
        public _id?: string,
        public userID?: string,
        public cartID?: string,
        public totalPriceOFOrder?: string,
        public shippingCity?: number,
        public shippingStreet?: string,
        public dateOfShipping?: string,
        public creditCard?: string,
        public amount?: number,
        public totalPrice?: number,
        public totalItems?: number,
        public productID?: string,
    ) { }
}