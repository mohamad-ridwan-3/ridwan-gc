import Container from "@/src/components/container"
import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress"
import AddressListTheme1 from "@/src/app/profile/address-list"

export const dynamic = 'force-dynamic'

export default async function AddressListPage() {
    const listCustomerAddress = await getListCustomerAddress()

    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={'theme1'}
        >
            <AddressListTheme1 customerAddress={listCustomerAddress}/>
        </Container>
    )
}