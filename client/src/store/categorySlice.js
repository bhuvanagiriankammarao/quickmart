
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../Admin/api/api';


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getCategories();
      return data;
    } catch (error) {
      return rejectWithValue('Error fetching categories');
    }
  }
);

export const addNewCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { dispatch, rejectWithValue }) => {
    try {
      await addCategory(categoryData);
      dispatch(fetchCategories()); // Fetch updated categories after adding
      return `Category "${categoryData.name}" added successfully!`;
    } catch (error) {
      return rejectWithValue('Error adding category');
    }
  }
);

export const updateExistingCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }, { dispatch, rejectWithValue }) => {
    try {
      await updateCategory(id, categoryData);
      dispatch(fetchCategories()); // Fetch updated categories after updating
      return `Category "${categoryData.name}" updated successfully!`;
    } catch (error) {
      return rejectWithValue('Error updating category');
    }
  }
);

export const removeCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ id, name }, { dispatch, rejectWithValue }) => {
    try {
      await deleteCategory(id);
      dispatch(fetchCategories()); // Fetch updated categories after deletion
      return `Category "${name}" deleted successfully!`;
    } catch (error) {
      return rejectWithValue('Error deleting category');
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    notification: '',
  },
  reducers: {
    clearNotification: (state) => {
      state.notification = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.notification = action.payload;
      })

      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        state.notification = action.payload;
      })

      .addCase(removeCategory.fulfilled, (state, action) => {
        state.notification = action.payload;
      });
  },
});

export const { clearNotification } = categorySlice.actions;

export default categorySlice.reducer;
