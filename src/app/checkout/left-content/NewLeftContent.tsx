import { useState } from "react";
import { ListCustomerAddressT } from "@/src/types/profile";
import HeaderPage from "../HeaderPage";
import { CouriersT, ResultShippingRateT } from "@/src/types/order";
import ListCouriers from "./ListCouriers";
import Address from "./Address";
import { PaymentMethodsT } from "@/src/types/checkout";
import Title from "../Title";
import Iconify from "@/src/components/Iconify";
import { ResultGetListCartT } from "@/src/types/cart";
import ProductSummary from "./ProductSummary";

type Props = {
    defaultAddress: ListCustomerAddressT
    shippingRateData: ResultShippingRateT
    selectCourier: CouriersT
    handleSelectCourier: (courier: PaymentMethodsT | CouriersT) => void
    carts: ResultGetListCartT
}

export default function NewLeftContent({
    defaultAddress,
    shippingRateData,
    selectCourier,
    handleSelectCourier,
    carts
}: Props) {
    const [showSummary, setShowSummary] = useState<boolean>(true)
    return (
        <div className="bg-white pt-8 px-8 screen-tm1-lg:pb-20 border-r flex justify-end">
            <div className="screen-tm1-lg:w-[36rem] w-full">
                <HeaderPage />
                {/* address */}
                <Address defaultAddress={defaultAddress} />
                <ListCouriers
                    shippingRateData={shippingRateData}
                    selectCourier={selectCourier}
                    handleSelectCourier={handleSelectCourier}
                />
                <div className="mt-4">
                    <button
                        className="flex items-center"
                        onClick={() => setShowSummary(!showSummary)}
                    >
                        <Title
                            title="Summary"
                            className="mb-0"
                        />
                        <Iconify
                            icon={`${showSummary ? 'prime:angle-up' : 'prime:angle-down'}`}
                            height={20}
                            width={20}
                        />
                    </button>

                    {showSummary &&
                        <div className="space-y-4 mt-5 flex flex-col">
                            {carts.data.carts.map((item, i) => (
                                <ProductSummary
                                    key={i}
                                    data={item}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}