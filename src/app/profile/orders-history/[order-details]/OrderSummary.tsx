import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    totalItems: number
    subtotal: string
    shippingTotal: string
    total: string
}

export default function OrderSummary({
    totalItems,
    subtotal,
    shippingTotal,
    total
}: Props) {
    return (
        <div className="py-4 space-y-4 border-b">
            <TypographyClient
                title="Order summary"
                props={{
                    children: <></>,
                    className: 'font-inter font-semibold text-sm'
                }}
            />
            <div className="flex justify-between items-center">
                <TypographyClient
                    title={`Subtotal(${totalItems} Item)`}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#737373]'
                    }}
                />
                <TypographyClient
                    title={subtotal}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-normal'
                    }}
                />
            </div>
            <div className="flex justify-between items-center">
                <TypographyClient
                    title={`Shipping Costs`}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#737373]'
                    }}
                />
                <TypographyClient
                    title={shippingTotal}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-normal'
                    }}
                />
            </div>
            <div className="flex justify-between items-center">
                <TypographyClient
                    title="Total:"
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-semibold'
                    }}
                />
                <TypographyClient
                    title={total}
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-semibold'
                    }}
                />
            </div>
        </div>
    )
}