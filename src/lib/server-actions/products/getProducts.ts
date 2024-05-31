'use server'

import { ResultProductDataT } from "@/src/types/products";
import getBaseURL from "../getBaseURL";

export async function getProducts(
    show?: number,
    search?: string,
    catchAllOtherParams?: string
): Promise<ResultProductDataT | undefined> {
    const baseURL = await getBaseURL()
    const response = await fetch(`${baseURL}/api/store/products?show=${show ? show : 10}&search=${search ? search : catchAllOtherParams ? catchAllOtherParams: ''}`, {cache: 'no-store'})
    if(!response.ok){
        throw new Error('Failed to get products')
    }
    const result = await response.json()
    if (result?.result && result?.data?.list?.length > 0) {
        return result
    }else if(result?.result && result?.data?.list?.length === 0){
        return result
    }else{
        return {} as ResultProductDataT
    }
}