import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../model/contact.model';

// Official example have this file as ts extension:
// https://codesandbox.io/s/rtk-query-demo-lbp7n?from-embed=&file=/src/app/services/counter.ts

// You can have multiple providesTags with the same values.
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // An array of string tag type names. Specifying tag types is optional, but you should define them so that they can be used for caching and invalidation. When defining a tag type, you will be able to provide them with providesTags and invalidate them with invalidatesTags when configuring endpoints.
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      // Test error
      // query: () => '/conta',
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation<{}, Contact>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

// other examples I follow just export contactsApi and get the hook in the component files that use it.
export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
