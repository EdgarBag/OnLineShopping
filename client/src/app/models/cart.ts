export class Cart {
    public constructor(
        public _id?: string,
        public userID?: string,
        public currentDate?: string,
        public status?: string,
        public totalPrice?: number,
        public totalItems?: number,
    ) { }

}

