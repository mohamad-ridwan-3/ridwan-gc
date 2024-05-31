import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    total: string
    method: string
}

export default function PaymentInfo({
    total,
    method
}: Props) {
    return (
        <div className="space-y-4 border-b py-4">
            <TypographyClient
                title="Paid with"
                props={{
                    children: <></>,
                    className: 'font-inter font-semibold text-sm'
                }}
            />
            <div className="flex justify-between items-center">
                <TypographyClient
                    title={method}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#737373]'
                    }}
                />
                <TypographyClient
                    title={total}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-normal'
                    }}
                />
            </div>
        </div>
    )
}