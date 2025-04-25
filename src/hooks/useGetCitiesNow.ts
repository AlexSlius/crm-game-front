import { useMutation } from '@tanstack/react-query';

import {
    cities
} from '../api';

export const useGetCitiesNow = () => {
    const { mutate: fetchCities, data: citiesData, isPending } = useMutation({
        mutationFn: ({ search = '' }: { search?: string }) => cities.getCities({ search }),
    });

    return {
        fetchCities,
        citiesData,
        isLoadingCity: isPending
    }
}