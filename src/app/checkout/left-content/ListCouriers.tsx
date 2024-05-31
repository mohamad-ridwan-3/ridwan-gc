import { CouriersT, ResultShippingRateT } from "@/src/types/order"
import Title from "../Title"
import PaymentCard from "./PaymentCard"
import { PaymentMethodsT } from "@/src/types/checkout"

type Props = {
    shippingRateData: ResultShippingRateT
    handleSelectCourier: (courier: PaymentMethodsT | CouriersT)=>void
    selectCourier: CouriersT
}

export default function ListCouriers({
    shippingRateData,
    handleSelectCourier,
    selectCourier
}: Props) {
    return (
        <div className="mt-8">
            <Title
                title="Choice of Courier"
            />
            <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-3 gap-4 mt-4">
                {shippingRateData.data.couriers.map((item, i) => {
                    return (
                        <PaymentCard
                            key={i}
                            name={item.name}
                            data={selectCourier}
                            onClick={()=>handleSelectCourier(item)}
                        />
                    )
                })}
            </div>
        </div>
    )
}