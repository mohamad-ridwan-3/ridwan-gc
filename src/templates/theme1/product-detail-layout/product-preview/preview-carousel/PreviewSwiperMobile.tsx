import { Swiper, SwiperSlide } from "swiper/react";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";
import 'swiper/css';
import { Dispatch, SetStateAction, useMemo } from "react";

type ImageProps = {
    imgelink: string
}

type Props = {
    data: ImageProps[]
    setCurrentImage: Dispatch<SetStateAction<ImageProps>>
    handlePopup?: () => void
    currentImage: ImageProps
    swiper: any
    imageClass?: string
}

export default function PreviewSwiperMobile({
    data,
    setCurrentImage,
    handlePopup,
    currentImage,
    swiper,
    imageClass
}: Props) {
    function onSlideChange(swiper: any): void {
        const findImg = data.find((item, i) =>
            i === swiper.activeIndex
        ) as ImageProps
        setCurrentImage(findImg)
    }

    const currentIndex = useMemo((): number => {
        const findImg = data.findIndex((item, i) =>
            item.imgelink === currentImage.imgelink
        )
        return findImg + 1
    }, [currentImage, data])

    return (
        <div>
            {/* total slide */}
            <div className="absolute bottom-2 left-2 screen-tm1-sm:left-1 border rounded-md py-1 px-2 z-[20] bg-white shadow">
                <p className="font-inter text-[#737373] text-sm">
                    {currentIndex}/{data.length}
                </p>
            </div>
            <Swiper
                slidesPerView={1}
                onSlideChange={onSlideChange}
                onSwiper={(s) => {
                    swiper.current = s
                }}
                grabCursor
                className="bg-white screen-tm1-sm:rounded-lg"
            >
                {data.map((item, i) => (
                    <SwiperSlide
                        key={i}
                        className="my-auto"
                    >
                        <Image
                            src={item.imgelink}
                            alt="product detail gangco"
                            height={500}
                            width={500}
                            sizes="100%"
                            decoding={i > 0 ? "async" : "sync"}
                            className={`rounded-md w-full mx-auto my-auto ${imageClass}`}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                                convertImageLoader(700, 475)
                            )}`}
                            loading={i > 0 ? 'lazy' : 'eager'}
                            onClick={handlePopup}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}