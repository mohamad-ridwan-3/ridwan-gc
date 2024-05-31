import Iconify from "@/src/components/Iconify"
import CarouselClient from "@/src/lib/client/carousel/CarouselClient"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

type ImageProps = {
    imgelink: string
}

type Props = {
    children: ReactNode
    updateIndex: number | null
    setUpdateIndex: Dispatch<SetStateAction<number | null>>
    setCurrentImage: Dispatch<SetStateAction<ImageProps>>
    data: ImageProps[]
    carouselId?: string
    btnDotId?: string
}

export default function PreviewCarousel({
    children,
    updateIndex,
    setUpdateIndex,
    setCurrentImage,
    data,
    carouselId,
    btnDotId = 'btnDot'
}: Props) {
    const [triggerSmallImgIndex, setTriggerSmallImgIndex] = useState<number>(0)

    useEffect(() => {
        const findImage = data.find((item, i) => i === triggerSmallImgIndex)
        if (findImage) {
            setCurrentImage(findImage)
        }
    }, [triggerSmallImgIndex])
    return (
        <CarouselClient
            props={{
                children: <></>,
                className: "mt-4 items-center bg-white rounded-lg",
                loop: true,
                autoplay: false,
                transition: {
                    type: "tween",
                    duration: 0.5
                },
                prevArrow: ({ loop, handlePrev, firstIndex, activeIndex }) => {
                    setTriggerSmallImgIndex(activeIndex)
                    return (
                        <button
                            onClick={() => {
                                handlePrev()
                                setUpdateIndex(null)
                            }}
                            type="button"
                            disabled={!loop && firstIndex}
                            className="!absolute top-2/4 left-1 -translate-y-2/4 !opacity-100 bg-white rounded-full text-gray-700 shadow-md p-2 screen-tm1-sm:p-2 justify-center"
                        >
                            <Iconify
                                icon="ooui:previous-ltr"
                                height={17}
                                width={17}
                                color="black"
                            />
                        </button>
                    )
                },
                nextArrow: ({ loop, handleNext, lastIndex }) => {
                    return (
                        <button
                            onClick={() => {
                                handleNext()
                                setUpdateIndex(null)
                            }}
                            disabled={!loop && lastIndex}
                            type="button"
                            className={"!absolute top-2/4 right-1 -translate-y-2/4 !opacity-100 bg-white rounded-full text-gray-700 shadow-md p-2 screen-tm1-sm:p-2 justify-center"}
                        >
                            <Iconify
                                icon="ooui:previous-rtl"
                                height={17}
                                width={17}
                                color="black"
                            />
                        </button>
                    )
                },
                navigation: ({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 right-4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                id={btnDotId}
                                className={`block h-[0.65rem] w-[0.65rem] cursor-pointer rounded-full transition-colors content-[''] ${activeIndex === i ? "bg-black" : "bg-gray-400"
                                    }`}
                                onClick={() => {
                                    if (updateIndex !== null) {
                                        setActiveIndex(updateIndex)
                                    } else {
                                        setUpdateIndex(null)
                                        setActiveIndex(i)
                                    }
                                }}
                            />
                        ))}
                    </div>
                )
            }}
        >
            {children}
        </CarouselClient>
    )
}