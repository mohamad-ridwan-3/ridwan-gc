import Iconify from "@/src/components/Iconify"
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import { Carousel } from "@material-tailwind/react"
import Image from "next/image"

type ImgPreview = {
    img: string
    name: string
}

type PropsProductPreview = {
    imgPreviews: ImgPreview[]
}

export default function ProductPreview({
    imgPreviews
}: PropsProductPreview) {
    return (
        <div>
            <div className="flex flex-col space-y-4 screen-d-md:sticky top-[30px]">
                <div>
                    <Carousel
                        className="mt-4"
                        loop
                        transition={
                            { type: "tween", duration: 0.5 }
                        }
                        placeholder={""}
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        prevArrow={({ loop, handlePrev, firstIndex }) => {
                            return (
                                <button
                                    onClick={handlePrev}
                                    disabled={!loop && firstIndex}
                                    className="!absolute top-2/4 left-0 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-16 sm:w-20 h-full text-white grid place-items-center"
                                >
                                    <Iconify
                                        icon="ooui:previous-ltr"
                                        height={20}
                                        width={20}
                                        color="white"
                                    />
                                </button>
                            )
                        }}
                        nextArrow={({ loop, handleNext, lastIndex }) => {
                            return (
                                <button
                                    onClick={handleNext}
                                    disabled={!loop && lastIndex}
                                    className="!absolute top-2/4 right-0 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-16 sm:w-20 h-full text-white grid place-items-center"
                                >
                                    <Iconify
                                        icon="ooui:previous-rtl"
                                        height={20}
                                        width={20}
                                        color="white"
                                    />
                                </button>
                            )
                        }}
                        navigation={() => { }}
                    >
                        {imgPreviews.map((item, i) => (
                            <Image
                                key={i}
                                src={item.img}
                                alt="detail-product wawacosmetics"
                                height={500}
                                width={500}
                                className="align-middle w-full object-contain"
                                loading="lazy"
                                decoding="async"
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                    convertImageLoader(700, 475)
                                )}`}
                            />
                        ))}
                    </Carousel>
                </div>
                <div className="grid grid-cols-4 screen-d-sm:grid-cols-6 screen-d-md:grid-cols-4 screen-d-lg:grid-cols-5 gap-4 px-4 screen-d-sm:px-0">
                    {imgPreviews.map((item, i) => (
                        <button key={i}>
                            <Image
                                src={item.img}
                                alt="product variant wawacosmetics"
                                className="align-middle max-w-full max-h-full"
                                height={80}
                                width={80}
                                loading="lazy"
                                decoding="async"
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                    convertImageLoader(700, 475)
                                )}`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}