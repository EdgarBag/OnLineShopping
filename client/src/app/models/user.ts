export class User {
    public constructor(
        public _id?: string,
        public userID?: number,
        public userFirstName?: string,
        public userLastName?: string,
        public typeOfUser?: number,
        public email?: string,
        public password?: string,
        public passwordConfirm?: string,
        public phoneNumber?: number,
        public city?: string,
        public street?: string,
        public buildingNumber?: number,
        public token?: string,
        public user?: object,
        public userToAdd?: object,
        public date?: string
    ) { }
}