import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

export default function SkeletonCartTheme1() {
    return (
        <>
            <TypographyClient
                props={{
                    variant: "h1",
                    className: `text-[#171717] font-inter font-bold text-3xl border-b pb-12 mt-8`,
                    children: <></>
                }}
            >
                Your Shopping Cart
            </TypographyClient>
            <div className="animate-pulse mt-8 flex">
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
        </>
    )
}