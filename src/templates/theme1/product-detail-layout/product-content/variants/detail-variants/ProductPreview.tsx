import { useState } from "react";
import Iconify from "@/src/components/Iconify";
import { SelectVariantT } from "@/src/types/products";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";
import ModalPreview from "../../../product-preview/preview-carousel/modal/ModalPreview";

type Props = {
    selectVariant: SelectVariantT
    name: string
}

export default function ProductPreview({
    selectVariant,
    name
}: Props) {
    const [onModal, setOnModal] = useState<boolean>(false)

    function handleModal(): void {
        setOnModal(!onModal)
    }

    return (
        <div
            className="flex items-center border-b-[1px] pt-4 pb-3 w-full px-4"
        >
            <ModalPreview
                open={onModal}
                handler={handleModal}
                productName={`${name} - ${selectVariant.attribute_value_name}${selectVariant.attribute_value_second_name ? `, ${selectVariant.attribute_value_second_name}` : ''}`}
            >
                <div className="flex w-auto bg-white py-4 screen-tm1-sm:rounded-lg">
                    <Image
                        src={selectVariant.image}
                        height={600}
                        width={600}
                        className="object-contain mx-auto"
                        alt="product info"
                        decoding="sync"
                        fetchPriority="high"
                        loading="eager"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                            convertImageLoader(700, 475)
                        )}`}
                    />
                </div>
            </ModalPreview>

            <div
                className="relative"
                onClick={handleModal}
            >
                <Image
                    src={selectVariant.image}
                    alt="product preview"
                    height={150}
                    width={150}
                    decoding="sync"
                    fetchPriority="high"
                    loading="eager"
                    className="max-w-full max-h-full rounded-md mr-4 !h-[revert-layer] object-cover"
                    style={{
                        height: 'revert-layer',
                    }}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                        convertImageLoader(700, 475)
                    )}`}
                />
                <div className="absolute h-8 w-8 bg-white flex justify-center items-center rounded-full right-1 bottom-[-5px] p-[4px] shadow-md">
                    <Iconify
                        icon="material-symbols:pan-zoom-rounded"
                        color="#737373"
                        height={25}
                        width={25}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-[#171717] font-inter font-normal text-start my-0.5 text-sm">
                    {name}
                </p>
                <div className="flex items-center flex-wrap">
                    <span className="p-1 font-inter text-start mt-1 rounded-sm bg-[#F2F9F9] text-[#666] font-semibold text-xs mr-1">
                        {selectVariant.attribute_value_name}
                    </span>
                    {selectVariant.attribute_value_second_name &&
                        <span className="p-1 text-start font-inter mt-1 rounded-sm bg-[#F2F9F9] text-[#666] font-semibold text-xs">
                            {selectVariant.attribute_value_second_name}
                        </span>
                    }
                </div>
                <span className="font-bold my-0.5 text-[#171717] font-inter text-lg">
                    {selectVariant.price}
                </span>
                {selectVariant.quantity !== 0 ?
                    <span className="text-[11.5px] text-[#171717] font-inter font-normal">
                        Stock: {selectVariant.quantity}
                    </span>
                    :
                    <p className="text-red-600 font-inter text-[11px]">
                        The item is out of stock
                    </p>
                }
            </div>
        </div>
    )
}