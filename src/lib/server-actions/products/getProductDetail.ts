import { ResultProductDetailT } from "@/src/types/products";
import getBaseURL from "../getBaseURL";

export async function getProductDetail(
    slug: string
): Promise<ResultProductDetailT> {
    const baseURL = await getBaseURL()
    const response = await fetch(`${baseURL}/api/store/productDetail`, {
        cache: 'no-store',
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({slug})
    })
    if(!response.ok){
        throw new Error('Failed to get product detail')
    }
    const result = await response.json()
    if(result?.result){
        return result
    }
    return {} as ResultProductDetailT
}