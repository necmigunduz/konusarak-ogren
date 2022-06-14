import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api'
    }),
    endpoints: (builder) => ({
        names: builder.query({
            query: () => '/character'
        })
    })
});

export const { useCharsQuery } = charApi;