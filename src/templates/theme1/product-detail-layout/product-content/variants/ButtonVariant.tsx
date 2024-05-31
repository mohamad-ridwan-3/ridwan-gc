import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import { Button } from "@material-tailwind/react";
import Image from "next/image";

type Props = {
    image?: string
    name: string
    onClick: ()=>void
    isActive?: boolean
    isOutStock?: boolean
}

export default function ButtonVariant({
    image,
    name,
    onClick,
    isActive,
    isOutStock
}: Props) {
    return (
        <Button
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            variant="outlined"
            size="sm"
            className={`normal-case flex space-x-2 items-center font-semibold font-inter p-2 text-[12px] text-[#171717] border-[1.5px] rounded-md border-gray-500 ${isActive && !isOutStock ? 'text-black border-black bg-[#e8e6e681]' : `${isActive ? 'text-gray-400 border-black' : isOutStock ? 'text-gray-400' : 'text-gray-700'}`}`}
            onClick={onClick}
        >
            {image &&
                <Image
                    src={image}
                    alt=""
                    height={30}
                    width={30}
                    className="object-contain rounded-sm"
                    placeholder="blur" 
                    decoding="async"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                        convertImageLoader(300, 300)
                    )}`}
                />
            }

            <p className="mt-0 mx-0 mb-0 pb-0 pt-0 px-0">
                {name}
            </p>
        </Button>
    )
}