import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    handleCreateOrder: () => void
    total: string
    loading: boolean
}

export default function MobileBtnCreateOrder({
    handleCreateOrder,
    total,
    loading
}: Props) {
    return (
        <div className="flex fixed screen-tm1-lg:hidden bottom-0 left-0 right-0 bg-white py-3 px-8 shadow-[rgba(60,60,60,0.2)_0px_-2px_2px_0px]">
            <div className="space-x-2 flex items-center justify-between w-full">
                <div className="space-x-1 flex items-center">
                    <TypographyClient
                        title="Total:"
                        props={{
                            children: <></>,
                            className: 'font-inter text-xs font-normal text-[#737373]'
                        }}
                    />
                    <TypographyClient
                        title={total}
                        props={{
                            children: <></>,
                            className: 'font-inter text-sm font-bold'
                        }}
                    />
                </div>
                <ButtonClient
                    title="Create Order"
                    props={{
                        children: <></>,
                        size: 'md',
                        type: 'button',
                        className: 'font-inter w-fit !shadow-none',
                        onClick: handleCreateOrder,
                        disabled: loading,
                        loading: loading
                    }}
                />
            </div>
        </div>
    )
}