import { ResultGetListCartT } from "@/src/types/cart";
import TextInput from "@/src/components/inputs/TextInput";
import { Typography } from "@material-tailwind/react";
import { CouriersT } from "@/src/types/order";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import Title from "../Title";

type Props = {
    carts: ResultGetListCartT
    selectCourier: CouriersT
    total: string
    handleCreateOrder: () => void
    loading: boolean
}

export default function RightContent({
    carts,
    selectCourier,
    total,
    handleCreateOrder,
    loading
}: Props) {
    return (
        <div className="bg-white screen-tm1-lg:bg-[#FAFAFA] pt-8 px-8 pb-20 flex justify-start">
            <div className="screen-tm1-lg:w-[36rem] w-full screen-tm1-lg:mt-[8.3rem] flex flex-col">
                <Title
                    title="Shopping summary"
                    className="mb-4"
                />
                <TextInput
                    title="Add gift card or discount code"
                />
                <div className="h-px w-full border-t mt-4"></div>
                <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-inter font-normal mb-0 text-sm"
                        >
                            Subtotal <span className="text-[#737373] font-inter">
                                ({carts.data.totalQty} Product)
                            </span>
                        </Typography>
                        <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-inter font-normal mb-0 text-sm"
                        >
                            {carts.data.subtotal}
                        </Typography>
                    </div>
                    {selectCourier?.price &&
                        <div className="flex justify-between items-center">
                            <Typography
                                placeholder=""
                                onPointerEnterCapture=""
                                onPointerLeaveCapture=""
                                className="font-inter font-normal mb-0 text-sm"
                            >
                                Shipping cost
                            </Typography>
                            <Typography
                                placeholder=""
                                onPointerEnterCapture=""
                                onPointerLeaveCapture=""
                                className="font-inter font-normal mb-0 text-sm"
                            >
                                {selectCourier.price}
                            </Typography>
                        </div>
                    }
                </div>
                <div className="h-px w-full border-t mt-4"></div>
                <div className="flex justify-between flex-wrap mt-4">
                    <div className="flex items-center space-x-2 mr-4">
                        <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-inter font-bold mb-0"
                        >
                            Total Payment
                        </Typography>
                        {/* <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-inter font-normal mb-0"
                        >
                            includes MYR0.00 tax
                        </Typography> */}
                    </div>
                    <Typography
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        className="font-inter font-bold mb-0"
                    >
                        {total}
                    </Typography>
                </div>
                <div className="hidden screen-tm1-lg:flex">
                    <ButtonClient
                        title="Create Order"
                        props={{
                            children: <></>,
                            size: 'md',
                            type: 'button',
                            className: 'font-inter mt-8 w-full text-center justify-center',
                            onClick: handleCreateOrder,
                            disabled: loading,
                            loading: loading
                        }}
                    />
                </div>
            </div>
        </div>
    )
}