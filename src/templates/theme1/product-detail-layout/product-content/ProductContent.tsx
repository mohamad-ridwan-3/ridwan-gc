'use client'

import { DataVariantProductT, ProuductT } from "@/src/types/products"
import { Typography } from "@material-tailwind/react"
import DesktopVariant from "./variants"

type VariationsT = {
    name: string
}

type PropsDesc = {
    desc: string
}

type PropsProductContent = {
    dataVariants: DataVariantProductT
    desc: string
    clickFirstAttribute:(value: string)=>void
    clickSecondAttribute: (value: string)=>void
} & ProuductT

function Description({ desc }: PropsDesc) {
    return <div dangerouslySetInnerHTML={{ __html: desc }} className="text-[#737373] font-inter">

    </div>
}

export default function ProductContent({
    dataVariants,
    desc,
    name,
    price,
    // discount,
    // img,
    clickFirstAttribute,
    clickSecondAttribute
}: PropsProductContent) {
    return (
        <div className="flex flex-col screen-tm1-sm:col-span-2 px-8 screen-tm1-lg:px-0">
            <Typography
                variant="h1"
                placeholder=""
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                className="font-inter text-[#171717] font-semibold text-[1.2rem] mb-4"
            >
                {name}
            </Typography>

            <div className="items-center flex space-x-2">
                {/* <Typography
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="line-through font-normal font-inter text-sm"
                >
                    {discount}
                </Typography> */}
                <Typography
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="font-inter text-3xl font-bold"
                >
                    {price}
                </Typography>
            </div>

            {dataVariants?.variant?.length > 0 &&
                <>
                    <hr className="mt-6 pt-1" />
                    <ul className="ml-0 mb-0 list-none flex flex-wrap gap-3">
                        <DesktopVariant
                            dataVariants={dataVariants}
                            clickFirstAttribute={clickFirstAttribute}
                            clickSecondAttribute={clickSecondAttribute}
                        />
                    </ul>
                    <hr className="mt-6 mb-6" />
                </>
            }

            <div className="text-left text-sm font-apple-system tracking-wide screen-tm1-lg:flex">
                <Description desc={desc} />
            </div>
        </div>
    )
}