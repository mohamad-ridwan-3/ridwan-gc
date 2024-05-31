import axios from "axios";

export const countryAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_COUNTRY_API_URL
})