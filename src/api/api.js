import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const namesApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api'
    }),
    endpoints: (builder) => ({
        names: builder.query({
            query: () => '/episode'
        })
    })  
});

export const { useNamesQuery } = namesApi;