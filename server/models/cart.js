class Cart {
    constructor(_id, userID, currentDate, status) {
        this._id = _id;
        this.userID = userID;
        this.currentDate = currentDate;
        this.status = status;
    }
}

module.exports = Cart