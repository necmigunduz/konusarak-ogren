import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const namesApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api'
    }),
    endpoints: (builder) => ({
        names: builder.query({
            query: () => '/episode'
        }),
        characters: builder.query({
            query: id => `/character/${id}`,            
        }),
    })  
});

export const { useNamesQuery, useCharactersQuery } = namesApi;