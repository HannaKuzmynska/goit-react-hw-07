import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts as fetchContactsAPI, addContact as addContactAPI, deleteContact as deleteContactAPI } from '../api';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const contacts = await fetchContactsAPI();
    return contacts;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  try {
    const newContact = await addContactAPI(contact);
    return newContact;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  try {
    await deleteContactAPI(id);
    return id;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      });
  },
});

export const selectFilteredContacts = createSelector(
  [state => state.contacts.items, state => state.filters.name],
  (contacts, filter) => contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
);

export default contactsSlice.reducer;

