'use client'

import { useSearchParams } from "next/navigation";
import SearchLayoutTheme1 from ".";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProuductT, ResultProductDataT } from "@/src/types/products";
import { Button } from "@material-tailwind/react";
import { getProducts } from "@/src/lib/server-actions/products/getProducts";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { addFirstLoadSearchPage } from "@/src/store/search/searchSlice";

type Props = {
    data: ResultProductDataT
}

export default function WrapSearchLayoutTheme1({
    data,
}: Props) {
    // state theme1
    const [productsData, setProductsData] = useState<ProuductT[]>(data.data.list)
    const [currentLoadMore, setCurrentLoadMore] = useState<number>(12)
    const [loading, setLoading] = useState<boolean>(false)

    const searchStore = useAppSelector((state) => state.search)
    const dispatch = useAppDispatch()
    const params = useSearchParams()
    const query = params.get('query')

    async function loadMore(): Promise<void> {
        if (!loading && isLoadMore) {
            setLoading(true)
            const result = await getProducts(currentLoadMore + 12)
            if (result?.result && result?.data?.list.length > 0) {
                setCurrentLoadMore(currentLoadMore + 12)
                setProductsData(result.data.list)
                setLoading(false)
            } else if (!result?.result) {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoading(false)
            }
        }
    }

    const newSearch = useCallback(async () => {
        if (!searchStore.isFirstLoadSearchPage) {
            setLoading(true)
            const result = await getProducts(12, query as string)
            if (result?.result && result?.data?.list.length > 0) {
                setCurrentLoadMore(12)
                setProductsData(result.data.list)
                setLoading(false)
            } else if (result?.data?.list?.length === 0) {
                setCurrentLoadMore(12)
                setProductsData([])
                setLoading(false)
            } else if (!result?.result) {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoading(false)
            }
        }
    }, [query, searchStore])

    useEffect(() => {
        dispatch(addFirstLoadSearchPage(true))
        return () => {
            dispatch(addFirstLoadSearchPage(true))
        }
    }, [])

    useEffect(() => {
        newSearch()
    }, [query])

    // theme1 logic
    const isLoadMore = useMemo((): boolean => {
        if (currentLoadMore < data.data.pagination.total) {
            return true
        }
        return false
    }, [currentLoadMore])

    return (
        <>
            <SearchLayoutTheme1
                query={query as string}
                products={productsData}
                isLoading={loading}
            >
                {productsData.length > 0 &&
                    <div className="flex justify-center pt-12 px-4">
                        <Button
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            variant={isLoadMore ? 'filled' : 'outlined'}
                            onClick={loadMore}
                            className="rounded-md shadow-none normal-case font-inter hover:opacity-[0.95] text-sm py-2 px-4 font-medium"
                            disabled={!isLoadMore || loading}
                        >
                            Load More
                        </Button>
                    </div>
                }
            </SearchLayoutTheme1>
        </>
    )
}