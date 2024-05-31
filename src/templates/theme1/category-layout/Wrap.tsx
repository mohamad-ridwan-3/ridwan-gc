'use client'

import { useMemo, useState } from "react"
import { Button } from "@material-tailwind/react"
import { getProducts } from "@/src/lib/server-actions/products/getProducts"
import { ProuductT, ResultProductDataT } from "@/src/types/products"
import { TemplateDirT } from "@/src/types/template"
import CategoryTheme1 from "."
import toast from "react-hot-toast"

type Props = {
    data: ResultProductDataT
    title: string
} & TemplateDirT

export default function WrapCategoryLayoutTheme1({
    data,
    templateDir,
    title,
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
            <CategoryTheme1
                products={productsData}
                title={title}
                templateDir={templateDir}
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