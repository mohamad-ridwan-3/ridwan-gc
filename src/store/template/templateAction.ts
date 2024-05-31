import { countryAPI } from "@/src/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTemplate = createAsyncThunk(
    'template',
    async ({ data }: any, { rejectWithValue }) => {
        try {
            const result = await countryAPI.get('/test.php')
            return result.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)