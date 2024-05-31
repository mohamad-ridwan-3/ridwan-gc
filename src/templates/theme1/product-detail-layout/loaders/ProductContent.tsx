import TypographyClient from "@/src/lib/client/typography/TypographyClienct"

export default function ProductContent() {
    function variant(): number[] {
        let index = []
        for (let i = 0; i < 5; i++) {
            index.push(i)
        }
        return index
    }
    const dataVariant = variant()
    return (
        <div className="flex flex-col screen-tm1-sm:col-span-2">
            <TypographyClient
                props={{
                    as: "div",
                    variant: "h1",
                    className: "h-6 w-full bg-gray-300",
                    children: <></>
                }}
            >
                &nbsp;
            </TypographyClient>
            <TypographyClient
                props={{
                    as: "div",
                    className: "h-2 w-24 bg-gray-200 mt-6",
                    children: <></>
                }}
            >
                &nbsp;
            </TypographyClient>
            <div className="space-y-4 pt-6">
                {dataVariant.map((item, i) => (
                    <TypographyClient
                        key={item}
                        props={{
                            as: "div",
                            className: "h-2 w-[13rem] bg-gray-200",
                            children: <></>
                        }}
                    >
                        &nbsp;
                    </TypographyClient>
                ))}
                <div className="pt-6 space-y-4">
                    <TypographyClient
                        props={{
                            as: "div",
                            className: "h-2 w-full sm:w-[18rem] bg-gray-200",
                            children: <></>
                        }}
                    >
                        &nbsp;
                    </TypographyClient>
                    <TypographyClient
                        props={{
                            as: "div",
                            className: "h-2 w-full bg-gray-200",
                            children: <></>
                        }}
                    >
                        &nbsp;
                    </TypographyClient>
                    <TypographyClient
                        props={{
                            as: "div",
                            className: "h-2 w-full bg-gray-200",
                            children: <></>
                        }}
                    >
                        &nbsp;
                    </TypographyClient>
                    <TypographyClient
                        props={{
                            as: "div",
                            className: "h-2 w-[13rem] bg-gray-200",
                            children: <></>
                        }}
                    >
                        &nbsp;
                    </TypographyClient>
                </div>
            </div>
        </div>
    )
}