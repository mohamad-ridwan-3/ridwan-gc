'use client'

import { ReactNode, useState } from "react"
import ProductContent from "./ProductContent"
import ProductPreview from "./ProductPreview"
import { ProuductT } from "@/src/types/products"

type ImgPreview = {
    img: string
    name: string
}

type PropsProductPreview = {
    imgPreviews: ImgPreview[]
}

type VariationsT = {
    name: string
}

type PropsProductContent = {
    varations: VariationsT[]
    desc: string
    // setSelectedVariant: Dispatch<SetStateAction<VariationsT>>
    // selectedVariant: VariationsT
} & ProuductT

type Props = PropsProductContent & ProuductT & {
    children: ReactNode
}

export default function WrapDefaultProductDetail({
    varations,
    desc,
    name,
    price,
    // discount,
    image,
    // selectedVariant,
    // setSelectedVariant,
    children
}: Props){
    const [selectedVariant, setSelectedVariant] = useState({} as VariationsT)
    const imgURL = process.env.NEXT_PUBLIC_PREFIX

    const [imgPreviewData, setImgPreviewData] = useState<ImgPreview[]>([
        {
            img: `${imgURL}/photo_2023_11_14_11_dwjeudspgxqaoqc3pe1q_1080x.jpeg`,
            name: 'product1',
        },
        {
            img: `${imgURL}/photo_2023_11_11_14_cj2dstcp0ovo91htf2b2_1080x.jpeg`,
            name: 'product2',
        },
        {
            img: `${imgURL}/photo_2023_11_14_11_dwjeudspgxqaoqc3pe1q_1080x.jpeg`,
            name: 'product3',
        },
        {
            img: `${imgURL}/photo_2023_11_18_09_hdsahjsqrownfo6nqgp2_1080x.jpeg`,
            name: 'product4',
        },
        {
            img: `${imgURL}/photo_2023_11_18_09_hdsahjsqrownfo6nqgp2_1080x.jpeg`,
            name: 'product4',
        },
        {
            img: `${imgURL}/photo_2023_11_18_09_hdsahjsqrownfo6nqgp2_1080x.jpeg`,
            name: 'product4',
        },
    ])


    return(
        <div className="flex justify-center w-screen min-h-[65vh] min-container-h:min-h-screen">
            <div className="w-[80rem] max-w-7xl screen-d-sm:px-8">
                <div className="grid screen-d-md:grid-cols-3 screen-d-lg:grid-cols-4 gap-4 screen-d-lg:gap-8 screen-d-sm:pb-32">
                    <ProductPreview imgPreviews={imgPreviewData} />
                    {/* <ProductContent
                        varations={varations}
                        desc={desc}
                        name={name}
                        price={price}
                        discount={discount}
                        image={image}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                    /> */}
                    {children}
                </div>
            </div>
        </div>
    ) 
}