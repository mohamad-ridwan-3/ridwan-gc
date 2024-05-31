'use client'

import { useMemo, useState } from "react";
import ProductsLayoutTheme1 from ".";
import { ProuductT, ResultProductDataT } from "@/src/types/products";
import { Button } from "@material-tailwind/react";
import { TemplateDirT } from "@/src/types/template";
import { getProducts } from "@/src/lib/server-actions/products/getProducts";
import toast from "react-hot-toast";

type Props = {
    data: ResultProductDataT
} & TemplateDirT

export default function WrapProductLayoutTheme1({
    data,
    templateDir
}: Props) {
    const [productsData, setProductsData] = useState<ProuductT[]>(data.data.list)
    const [currentLoadMore, setCurrentLoadMore] = useState<number>(12)
    const [loading, setLoading] = useState<boolean>(false)

    const isLoadMore = useMemo((): boolean => {
        if (currentLoadMore < data.data.pagination.total) {
            return true
        }
        return false
    }, [currentLoadMore])

    async function loadMore(): Promise<void> {
        if (!loading && isLoadMore) {
            setLoading(true)
            const result = await getProducts(currentLoadMore + 12)
            if (result?.result && result?.data?.list.length > 0) {
                setCurrentLoadMore(currentLoadMore + 12)
                setProductsData(result.data.list)
                setLoading(false)
            } else {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoading(false)
            }
        }
    }

    return (
        <>
            <ProductsLayoutTheme1
                products={productsData}
                templateDir={templateDir}
                loading={loading}
                total={6}
            />
            {productsData.length > 0 &&
                <div className="flex justify-center pt-12 px-4">
                    <Button
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        variant={isLoadMore ? 'filled' : 'outlined'}
                        onClick={loadMore}
                        className="rounded-md shadow-none normal-case font-inter hover:opacity-[0.95] text-sm py-2 px-4 font-medium"
                        disabled={loading || !isLoadMore}
                        loading={loading}
                    >
                        Load More
                    </Button>
                </div>
            }
        </>
    )
}