export const currencyFrom = (
    number: number,
    locale: string,
    currency: string,
) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};
