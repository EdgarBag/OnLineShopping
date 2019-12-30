export class IfUserLogIn {
    public constructor(
        public _id?: string,
        public userID?: string,
        public token?: string,
        public totalPriceOFOrder?: string,
        public shippingCity?: number,
        public shippingStreet?: string,
        public dateOfShipping?: string,
        public creditCard?: string,
        public count?: number,
    ) { }
}