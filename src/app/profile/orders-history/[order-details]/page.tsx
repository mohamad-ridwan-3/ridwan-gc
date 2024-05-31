import Container from "@/src/components/container";
import BackIconBtn from "../../BackIconBtn";
import HeaderContent from "../../Header";
import BottomBackBtn from "../../BottomBackBtn";
import orderDetail from "@/src/lib/server-actions/order/orderDetail";
import { redirect } from "next/navigation";
import Status from "./Status";
import CreatedAt from "./CreatedAt";
import Address from "./Address";
import ListsProduct from "./ListsProduct";
import OrderSummary from "./OrderSummary";
import PaymentInfo from "./PaymentInfo";

type Params = {
    params: {
        'order-details': string
    }
}

export default async function OrderDetails({
    params
}: Params) {
    const data = await orderDetail({
        order_number: params['order-details']
    })
    if (!data.result) {
        redirect('/login')
    }
    return (
        <Container
            // theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={'theme1'}
        >
            <div className="flex flex-col mt-4 w-full">
                <BackIconBtn
                    href="/profile/orders-history"
                />
                <HeaderContent
                    title="Order Details"
                    desc="You can view the products that you have purchased and your order status here."
                />

                <div className="space-y-6">
                    <Status
                        status={data.data.status}
                    />
                    <CreatedAt created_at={data.data.created_at} />
                    <Address address={data.data.address} />
                </div>
                <ListsProduct
                    order_number={data.data.order_number}
                    items={data.data.items}
                />
                <OrderSummary
                    totalItems={data.data.items.length}
                    subtotal={data.data.subtotal}
                    shippingTotal={data.data.shipping.total}
                    total={data.data.total}
                />
                <PaymentInfo
                    method={data.data.payment.method}
                    total={data.data.total}
                />

                <BottomBackBtn href="/profile/orders-history" />
            </div>
        </Container>
    )
}