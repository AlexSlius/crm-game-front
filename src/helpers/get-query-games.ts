export const getQueryStringGame = (
    filter: {
        cities?: number[];
        statuses?: number[];
        search?: string;
        dateFrom: any,
        dateTo: any,
    },
    pagination: {
        current: number;
        pageSize: number;
    }
) => {
    const params = new URLSearchParams();

    params.set("page", pagination.current.toString());
    params.set("limit", pagination.pageSize.toString());

    if (filter.cities?.length) {
        filter.cities.forEach((cityId) => {
            params.append("cities", cityId.toString());
        });
    }

    if (filter.cities?.length) {
        filter.cities.forEach((cityId) => {
            params.append("cities", cityId.toString());
        });
    }

    if (filter.statuses?.length) {
        filter.statuses.forEach((statusId) => {
            params.append("statuses", statusId.toString());
        });
    }

    if (filter.dateFrom && filter.dateTo) {
        params.append("dateFrom", filter.dateFrom?.format('YYYY-MM-DD'));
        params.append("dateTo", filter.dateTo?.format('YYYY-MM-DD'));
    }

    if (filter.search) {
        params.set("search", filter.search);
    }

    return params.toString();
};

