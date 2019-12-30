export class Order {
    public constructor(
        public _id?: string,
        public userID?: string,
        public cartID?: string,
        public totalPriceOFOrder?: string,
        public shippingCity?: number,
        public shippingStreet?: string,
        public dateOfShipping?: string,
        public creditCard?: string,
        public count?: number,
    ) { }
}