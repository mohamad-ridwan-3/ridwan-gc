import Container from "@/src/components/container";
import HeaderContent from "../Header";
import ClientWrap from "./ClientWrap";
import BackIconBtn from "../BackIconBtn";
import listsOrder from "@/src/lib/server-actions/order/listsOrder";
import { TabListsOrderHistoryT } from "@/src/types/order";

export default async function OrdersHistory() {
    const listOrderData = await listsOrder(
        '?search&show'
    )
    const pending = (): TabListsOrderHistoryT[] => {
        if (listOrderData?.data?.list?.length > 0) {
            const getPendings = listOrderData.data.list.filter(item =>
                item.status === 'Pending'
            )
            return [
                {
                    label: 'Pending',
                    value: 'pending',
                    data: getPendings
                }
            ]
        }
        return [
            {
                label: 'Pending',
                value: 'pending',
                data: []
            }
        ]
    }
    const all = (): TabListsOrderHistoryT[] => {
        if (listOrderData?.data?.list?.length > 0) {
            const getPendings = listOrderData.data.list.filter(item =>
                item.status === 'Pending'
            )
            return [
                {
                    label: 'All',
                    value: 'all',
                    data: getPendings
                }
            ]
        }
        return [
            {
                label: 'All',
                value: 'all',
                data: []
            }
        ]
    }
    const completed = (): TabListsOrderHistoryT[] => {
        return [
            {
                label: 'Completed',
                value: 'completed',
                data: []
            }
        ]
    }
    const delivery = (): TabListsOrderHistoryT[] => {
        return [
            {
                label: 'Delivery',
                value: 'delivery',
                data: []
            }
        ]
    }
    const processedBySeller = (): TabListsOrderHistoryT[] => {
        return [
            {
                label: 'Processed by Seller',
                value: 'processed-by-seller',
                data: []
            }
        ]
    }
    const waitingForPayment = (): TabListsOrderHistoryT[] => {
        return [
            {
                label: 'Waiting for Payment',
                value: 'waiting-for-payment',
                data: []
            }
        ]
    }

    return (
        <>
            <Container
                // theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
                templateDir={'theme1'}
            >
                <div className="flex flex-col mt-4 w-full">
                    <BackIconBtn
                        href="/profile"
                    />
                    <HeaderContent
                        title="My Order History"
                        desc="You can view the products that you have purchased and your order status here."
                    />
                </div>
            </Container>
            <div className="flex justify-center w-screen min-h-[65vh] min-container-h:min-h-screen">
                <div className="w-[80rem] max-w-7xl px-6">
                    <ClientWrap
                        data={listOrderData}
                        pending={pending()}
                        all={all()}
                        completed={completed()}
                        delivery={delivery()}
                        processedBySeller={processedBySeller()}
                        waitingForPayment={waitingForPayment()}
                    />
                </div>
            </div>
        </>
    )
}