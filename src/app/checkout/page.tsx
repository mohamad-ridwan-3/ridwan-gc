import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress";
import ClientWrap from "./ClientWrap";
import { redirect } from "next/navigation";
import shippingRate from "@/src/lib/server-actions/order/shippingRate";
import getListCart from "@/src/lib/server-actions/cart/getListCart";

export default async function Checkout() {
    const listCustomerAddress = await getListCustomerAddress()
    const defaultAddress = listCustomerAddress?.data?.find(item => item.is_default === 1)

    if (!defaultAddress?.id) {
        redirect('/profile/address-list')
    }

    const shippingRateData = await shippingRate({ address_id: defaultAddress.id })
    const carts = await getListCart()

    return (
        <ClientWrap
            defaultAddress={defaultAddress}
            shippingRateData={shippingRateData}
            carts={carts}
        />
    )
}