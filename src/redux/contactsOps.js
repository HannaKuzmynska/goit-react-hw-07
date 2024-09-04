import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api'; 

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await api.get('/');
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact) => {
    const response = await api.post('/', contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id) => {
    await api.delete(`/${id}`);
    return { id };
  }
);