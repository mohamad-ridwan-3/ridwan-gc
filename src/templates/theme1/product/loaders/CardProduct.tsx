import CardClient from "@/src/lib/client/cards/CardClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    total: number
}

export default function CardProduct({
    total
}: Props) {
    function loopCard(): number[] {
        let index: number[] = []
        for (let i = 0; i < total; i++) {
            index.push(i)
        }
        return index
    }

    const totalData: number[] = loopCard()

    return (
        <>
            {totalData.map((item) => (
                <CardClient
                    key={item}
                    props={{
                        shadow: false,
                        color: "white",
                        children: <></>,
                        className: 'animate-pulse'
                    }}
                >
                    <div className="h-[180px] w-full bg-gray-200"></div>

                    <div className="space-y-3 mt-4">
                        <TypographyClient
                            props={{
                                as: "div",
                                variant: "h1",
                                className: "h-2 w-full rounded-full bg-gray-200",
                                children: <></>
                            }}
                        >
                            &nbsp;
                        </TypographyClient>
                        <TypographyClient
                            props={{
                                as: "div",
                                variant: "h1",
                                className: "h-2 w-20 rounded-full bg-gray-200",
                                children: <></>
                            }}
                        >
                            &nbsp;
                        </TypographyClient>
                        <TypographyClient
                            props={{
                                as: "div",
                                variant: "h1",
                                className: "h-2 w-20 rounded-full bg-gray-200",
                                children: <></>
                            }}
                        >
                            &nbsp;
                        </TypographyClient>
                    </div>
                </CardClient>
            ))}
        </>
    )
}