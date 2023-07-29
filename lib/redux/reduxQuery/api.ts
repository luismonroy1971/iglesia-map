import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011/api/v1';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});

export default api.enhanceEndpoints({
  addTagTypes: ['Location'],
});
