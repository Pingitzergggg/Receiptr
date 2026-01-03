export type cards = {
    id : number,
    title : string,
    print : string,
    className : number,
    color : string
};

export type classes = {
    id : number,
    title : string,
    cardsUsed : number,
    receiptsUsed : number,
    color : string
};

export type receipts = {
    id : number,
    title : string,
    creation : Date,
    size : number,
    unit : "MiB" | "KiB",
    type : ".pdf", //Should be removed when changed DB!
    cardName : string,
    className : string,
    color : string
};

export type user = {
    id : number,
    username : string,
    email : string,
    tel : string,
    countryCode : string
};
