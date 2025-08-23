import { Order } from "~/types";

export const sortBy = <T>(
    data: T[],
    key: keyof T,
    order: Order = Order.ASC,
): T[] =>
    data.sort((a, b) =>
        order === Order.ASC
            ? (a[key] as number) - (b[key] as number)
            : order === Order.DESC
              ? (b[key] as number) - (a[key] as number)
              : (a[key] as number) - (b[key] as number),
    );
