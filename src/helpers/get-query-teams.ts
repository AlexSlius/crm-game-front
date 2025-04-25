export const getQueryStringTeams = (
    filter: {
        cities?: number[];
        statuses?: number[];
        games?: number[];
        names?: string[],
        captains?: string[],
        phones?: string[],
        dateFrom: any;
        dateTo: any;
    },
    pagination?: {
        current: number;
        pageSize: number;
    }
) => {
    const params = new URLSearchParams();

    if (pagination?.current)
        params.set("page", pagination.current.toString());

    if (pagination?.pageSize)
        params.set("limit", pagination.pageSize.toString());

    if (filter.phones?.length) {
        filter.phones.forEach((value) => {
            params.append("phones", value);
        });
    }

    if (filter.captains?.length) {
        filter.captains.forEach((value) => {
            params.append("captains", value);
        });
    }

    if (filter.names?.length) {
        filter.names.forEach((value) => {
            params.append("teams", value);
        });
    }

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

    if (filter.games?.length) {
        filter.games.forEach((game) => {
            params.append("games", game.toString());
        });
    }

    if (filter.dateFrom && filter.dateTo) {
        params.append("dateFrom", filter.dateFrom?.format('YYYY-MM-DD'));
        params.append("dateTo", filter.dateTo?.format('YYYY-MM-DD'));
    }

    return params.toString();
};

