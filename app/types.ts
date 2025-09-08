export interface Apartment {
    id: number;
    apartmentNumber: number;
    image?: string;
    title: string;
    area: number;
    price: number;
    rooms: number;
    currentFloor: number;
    totalFloors: number;
}

export interface Data {
    items: Apartment[];
    totalPages: number;
}

export enum Order {
    ASC = "asc",
    DESC = "desc",
}

export enum Sort {
    AREA = "area",
    FLOOR = "floor",
    PRICE = "price",
}

export interface SortItem {
    title: string;
    sort: Sort;
    order?: Order;
    class?: string;
}
export interface ActiveRoom {
    room: number;
    active: boolean;
}

export type FilterTypes = "price" | "area" | "rooms";

export type SliderData = [number, number];

export type SLiderFormatter = "currency";
