import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import PreviewCarousel from "../PreviewCarousel"
import PreviewSwiperMobile from "../PreviewSwiperMobile"

type ImageProps = {
    imgelink: string
}

type Props = {
    data: ImageProps[]
}

export default function PreviewOnModal({
    data,
}: Props) {
    const swiper = useRef<any>(null)
    const [currentImage, setCurrentImage] = useState<ImageProps>({ imgelink: data[0].imgelink })
    const [updateIndex, setUpdateIndex] = useState<number | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && updateIndex !== null) {
            document.getElementById('btnDotModalPreview')?.click()
        }
    }, [updateIndex])

    function handleChangePreview(img: ImageProps, i: number): void {
        setUpdateIndex(i)
        setCurrentImage(img)
    }

    return (
        <div className="screen-tm1-sm:grid screen-tm1-sm:grid-cols-3 gap-4">
            <div className="screen-tm1-sm:col-span-2">
                {/* desktop */}
                <div className="hidden screen-tm1-lg:block">
                    <PreviewCarousel
                        updateIndex={updateIndex}
                        setUpdateIndex={setUpdateIndex}
                        setCurrentImage={setCurrentImage}
                        data={data}
                        btnDotId="btnDotModalPreview"
                    >
                        {data.map((item, i) => {
                            return (
                                <Image
                                    key={i}
                                    src={item.imgelink}
                                    alt="product detail storefront"
                                    height={500}
                                    width={500}
                                    sizes="100%"
                                    fetchPriority="high"
                                    decoding={i > 0 ? "async" : "sync"}
                                    loading={i > 0 ? "lazy" : "eager"}
                                    className="rounded-md w-full max-w-[700px] screen-tm1-sm:max-w-[500px] mx-auto my-auto"
                                    placeholder="blur"
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                        convertImageLoader(700, 475)
                                    )}`}
                                />
                            )
                        })}
                    </PreviewCarousel>
                </div>
                {/* mobile */}
                <div className="screen-tm1-lg:hidden relative">
                    <PreviewSwiperMobile
                        data={data}
                        setCurrentImage={setCurrentImage}
                        currentImage={currentImage}
                        swiper={swiper}
                        imageClass="max-w-[400px]"
                    />
                </div>
            </div>
            <div className="mt-8 screen-tm1-sm:mt-0 px-4">
                <TypographyClient
                    title="Picture of items"
                    props={{
                        children: <></>,
                        className: 'font-inter text-white font-semibold'
                    }}
                />
                <div
                    // className="grid grid-cols-3 gap-3 mt-4 overflow-y-auto"
                    className="flex overflow-x-auto screen-tm1-sm:grid screen-tm1-sm:overflow-y-auto screen-tm1-sm:grid-cols-3 gap-3 mt-4"
                >
                    {data.map((item, i) => (
                        <button
                            key={i}
                            className={`rounded-md bg-white overflow-hidden ${item.imgelink === currentImage.imgelink ? 'border-2 border-[#c2890e]' : 'border-2 border-white'}`}
                            onClick={() => {
                                handleChangePreview(item, i)
                                swiper?.current?.slideTo(i)
                            }}
                            type="button"
                        >
                            <Image
                                src={item.imgelink}
                                alt="product detail storefront"
                                height={100}
                                width={100}
                                sizes="100%"
                                decoding={i > 0 ? "async" : "sync"}
                                loading={i > 0 ? "lazy" : "eager"}
                                placeholder="blur"
                                className="w-full max-w-[80px] screen-tm1-sm:max-w-none object-contain mx-auto"
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