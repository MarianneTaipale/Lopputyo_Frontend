export type Training = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: {
        firstname: string;
        lastname: string;
    }
}

export type Customer = {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}
