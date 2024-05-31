import Container from "@/src/components/container"
import ProfileLayoutTheme1 from "@/src/app/profile"
import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress"
import { ListCustomerAddressT } from "@/src/types/profile"
import HeaderContent from "./Header"

export const dynamic = 'force-dynamic'

export default async function UserProfile() {
    const listCustomerAddress = await getListCustomerAddress()
    const defaultAddress = listCustomerAddress?.data?.find(item => item.is_default === 1)

    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={'theme1'}
        >
            <div className="flex flex-col mt-8 w-full">
                <HeaderContent
                    title="My Account"
                    desc="You can now view or change your account information here which includes your personal details, your shipping address. You may view your order status here too."
                />
                <ProfileLayoutTheme1
                    defaultAddress={defaultAddress as ListCustomerAddressT}
                />
            </div>
        </Container>
    )
}