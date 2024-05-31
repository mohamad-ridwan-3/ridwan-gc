import { CartsT } from "@/src/types/cart"
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import { Input, Typography } from "@material-tailwind/react"
import { CldImage } from "next-cloudinary"
import Image from "next/image"
import Link from "next/link"

type PropsTableRows = {
    carts: CartsT[]
}

export default function TableRows({
    carts
}: PropsTableRows) {

    return (
        <tbody>
            {carts.map((item, i) => (
                <tr key={i} className="border-b">
                    <td className="p-3">
                        <div className="flex items-center space-x-8">
                            <Link
                                href={item.slug as string}
                            >
                                <Image
                                    src={item.image}
                                    alt="cart products storefront"
                                    width={200}
                                    height={200}
                                    className="object-cover max-w-[100px]"
                                    sizes="100%"
                                    loading="lazy"
                                    decoding="async"
                                    placeholder="blur"
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                        convertImageLoader(700, 475)
                                    )}`}
                                />
                                {/* <CldImage
                                    deliveryType="fetch"
                                    src={item.img}
                                    alt="cart products storefront"
                                    width={200}
                                    height={200}
                                    className="object-cover max-w-[100px]"
                                    sizes="100%"
                                    loading="lazy"
                                    decoding="async"
                                /> */}
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    href={item.slug as string}
                                >
                                    <Typography
                                        placeholder=""
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                        className="font-apple-system font-normal text-start hover:opacity-[0.96] transition-all mb-0"
                                    >
                                        {item.name}
                                    </Typography>
                                </Link>
                                <Link href="#" className="underline text-sm font-apple-system italic text-start hover:no-underline transition-all hover:opacity-[0.96]">
                                    Remove
                                </Link>
                            </div>
                        </div>
                    </td>
                    <td className="p-3">
                        <div className="w-[6rem]">
                            <Input
                                onPointerEnterCapture=""
                                crossOrigin=""
                                onPointerLeaveCapture=""
                                type="number"
                                className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-sm"
                                labelProps={{
                                    className: "hidden",
                                }}
                                value={item.quantity}
                                containerProps={{ className: "min-w-[20px]" }}
                            />
                        </div>
                    </td>
                    <td className="p-3">
                        <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-apple-system font-normal mb-0"
                        >
                            {item.total}
                        </Typography>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}