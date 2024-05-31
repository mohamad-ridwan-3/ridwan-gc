import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

export default function SkeletonCart() {
    function loopCard(): number[] {
        let index: number[] = []
        for (let i = 0; i < 2; i++) {
            index.push(i)
        }
        return index
    }

    const totalData: number[] = loopCard()

    return (
        <>
            <div className="animate-pulse mt-8 flex flex-col space-y-12">
                {totalData.map((item, i) => (
                    <div 
                    key={i}
                    className="flex"
                    >
                        {/* image */}
                        <div className="min-w-[100px] sm:screen-tm1-sm:w-[126px] bg-gray-200 h-[126px]"></div>
                        {/* info */}
                        <div className="ml-4 space-y-4 w-[70%]">
                            <TypographyClient
                                props={{
                                    as: "div",
                                    variant: "h1",
                                    className: "h-2 w-full screen-d-sm:w-[15rem] rounded-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                            <TypographyClient
                                props={{
                                    as: "div",
                                    className: "h-2 w-full screen-d-sm:w-[10rem] rounded-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                            <TypographyClient
                                props={{
                                    as: "div",
                                    className: "h-2 w-full screen-d-sm:w-[10rem] rounded-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}