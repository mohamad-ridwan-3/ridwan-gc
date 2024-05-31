import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import PreviewCarousel from "./preview-carousel/PreviewCarousel"
import ModalPreview from "./preview-carousel/modal/ModalPreview"
import PreviewSwiperMobile from "./preview-carousel/PreviewSwiperMobile"
import PreviewOnModal from "./preview-carousel/modal/PreviewOnModal"
import ScrollContainer from "react-indiana-drag-scroll"

type PropsProductPreview = {
    images: string[]
    productName: string
}

type ImageProps = {
    imgelink: string
}

export default function ProductPreview({
    images,
    productName
}: PropsProductPreview) {
    const [currentImage, setCurrentImage] = useState<ImageProps>({ imgelink: images[0] })
    const [onModal, setOnModal] = useState<boolean>(false)
    const [updateIndex, setUpdateIndex] = useState<number | null>(null)
    const swiper = useRef<any>(null)
    const data = images.map((item => ({ imgelink: item })))

    function handleChangePreview(img: ImageProps, i: number): void {
        setUpdateIndex(i)
        setCurrentImage(img)
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && updateIndex !== null) {
            document.getElementById('btnDot')?.click()
        }
    }, [updateIndex])

    function handlePopup(): void {
        setOnModal(!onModal)
    }

    return (
        <div>
            <ModalPreview
                open={onModal}
                handler={handlePopup}
                productName={productName}
            >
                <PreviewOnModal
                    data={data}
                />
            </ModalPreview>
            <div className="screen-tm1-sm:sticky top-[80px]">
                <div className="relative max-h-fit">
                    {/* desktop */}
                    <div className="hidden screen-tm1-lg:block">
                        <PreviewCarousel
                            updateIndex={updateIndex}
                            setUpdateIndex={setUpdateIndex}
                            setCurrentImage={setCurrentImage}
                            data={data}
                        >
                            {data.map((item, i) => {
                                return (
                                    <button
                                        onClick={handlePopup}
                                        className="w-full"
                                        key={i}
                                    >
                                        <Image
                                            src={item.imgelink}
                                            alt="product detail gangco"
                                            height={500}
                                            width={500}
                                            sizes="100%"
                                            fetchPriority="high"
                                            decoding={i > 0 ? "async" : "sync"}
                                            loading={i > 0 ? 'lazy': 'eager'}
                                            className="rounded-md w-full max-w-[468px] mx-auto my-auto"
                                            placeholder="blur"
                                            blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                                convertImageLoader(700, 475)
                                            )}`}
                                        />
                                    </button>
                                )
                            })}
                        </PreviewCarousel>
                    </div>
                    {/* mobile */}
                    <div className="screen-tm1-lg:hidden">
                        <PreviewSwiperMobile
                            data={data}
                            setCurrentImage={setCurrentImage}
                            handlePopup={handlePopup}
                            currentImage={currentImage}
                            swiper={swiper}
                            imageClass="max-w-[268px]"
                        />
                    </div>
                </div>

                {/* <CldImageClient
                    deliveryType="fetch"
                    src={img}
                    alt="product detail storefront"
                    height={500}
                    width={500}
                    sizes="100%"
                    fetchPriority="high"
                    decoding="async"
                /> */}

                <ScrollContainer
                    // className="grid grid-cols-3 screen-tm1-sm:grid-cols-6 screen-tm1-lg:grid-cols-3 gap-3 mt-4"
                    className="flex items-center overflow-x-auto gap-3 mt-4 px-8 screen-tm1-lg:px-0"
                >
                    {data.map((item, i) => (
                        <button
                            key={i}
                            className={`rounded-md min-w-[80px] overflow-hidden ${item.imgelink === currentImage.imgelink ? 'border-2 border-[#c2890e]' : 'border-2 border-white'}`}
                            onClick={() => {
                                handleChangePreview(item, i)
                                swiper?.current?.slideTo(i)
                            }}
                        >
                            <Image
                                src={item.imgelink}
                                alt="product detail storefront"
                                height={100}
                                width={100}
                                sizes="100%"
                                decoding={i > 0 ? "async" : "sync"}
                                placeholder="blur"
                                loading={i > 0 ? 'lazy': 'eager'}
                                className="w-full max-w-[80px] object-contain mx-auto my-auto"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                    convertImageLoader(700, 475)
                                )}`}
                            />
                        </button>
                    ))}
                </ScrollContainer>
            </div>
        </div>
    )
}