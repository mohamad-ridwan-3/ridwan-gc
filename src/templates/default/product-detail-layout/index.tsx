import './description.css'
import { ProuductT } from "@/src/types/products"
import ProductPreview from "./ProductPreview"
import ProductContent from "./ProductContent"
import AddToCart from "./AddToCart"
import { Dispatch, SetStateAction } from 'react'

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
    setSelectedVariant: Dispatch<SetStateAction<VariationsT>>
    selectedVariant: VariationsT
} & ProuductT

type Props = PropsProductPreview & PropsProductContent & ProuductT


export default function DefaultProductDetail({
    imgPreviews,
    varations,
    desc,
    name,
    price,
    selectedVariant,
    setSelectedVariant
}: Props) {
    return (
        <div className="flex justify-center w-screen min-h-[65vh] min-container-h:min-h-screen">
            <div className="w-[80rem] max-w-7xl screen-d-sm:px-8">
                <div className="grid screen-d-md:grid-cols-3 screen-d-lg:grid-cols-4 gap-4 screen-d-lg:gap-8 screen-d-sm:pb-32">
                    <ProductPreview imgPreviews={imgPreviews} />
                    {/* <ProductContent
                        varations={varations}
                        desc={desc}
                        name={name}
                        price={price}
                        // discount={discount}
                        // img={img}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                    /> */}
                    <AddToCart />
                </div>
            </div>
        </div>
    )
}