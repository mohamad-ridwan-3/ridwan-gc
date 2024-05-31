import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";
import { useState } from "react";
import ModalPreview from "../product-preview/preview-carousel/modal/ModalPreview";
import Iconify from "@/src/components/Iconify";

type Props = {
    image?: string
    variant?: string
    productName: string
}

export default function ProductInfo({
    image,
    variant,
    productName
}: Props) {
    const [onModal, setOnModal] = useState<boolean>(false)

    function handleModal(): void {
        setOnModal(!onModal)
    }
    return (
        <div className="flex items-center space-x-2 border-b pb-3">
            {image &&
                <ModalPreview
                    open={onModal}
                    handler={handleModal}
                    productName={variant ? `${productName} - ${variant}` : productName}
                >
                    <div className="flex w-auto bg-white py-4 screen-tm1-sm:rounded-lg">
                        <Image
                            src={image}
                            height={600}
                            width={600}
                            className="object-contain mx-auto"
                            alt="product info"
                            placeholder="blur"
                            decoding="sync"
                            fetchPriority="high"
                            loading="eager"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                convertImageLoader(700, 475)
                            )}`}
                        />
                    </div>
                </ModalPreview>
            }
            {image &&
                <button
                    onClick={handleModal}
                    className="relative"
                >
                    <Image
                        src={image}
                        alt="product info"
                        height={60}
                        width={60}
                        decoding="sync"
                        fetchPriority="high"
                        loading="eager"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                            convertImageLoader(700, 475)
                        )}`}
                        className="object-contain rounded-md"
                    />
                    <div className="absolute h-5 w-5 bg-white flex justify-center items-center rounded-full right-[-5px] top-[-5px] p-[3px] shadow-md">
                        <Iconify
                            icon="material-symbols:pan-zoom-rounded"
                            color="#737373"
                            height={25}
                            width={25}
                        />
                    </div>
                </button>
            }
            <TypographyClient
                title={variant}
                props={{
                    children: <></>,
                    className: 'font-inter text-black text-sm font-normal'
                }}
            />
        </div>
    )
}