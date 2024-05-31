import Container from "../../components/container"
import CartTheme1 from "../../templates/theme1/cart-layout"
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate"
import getListCart from "@/src/lib/server-actions/cart/getListCart"
import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress"

export const dynamic = 'force-dynamic'

export default async function Cart() {
    const template = await getTemplate()
    const carts = await getListCart()
    const listCustomerAddress = await getListCustomerAddress()
    const defaultAddress = listCustomerAddress?.data?.find(item => item.is_default === 1)

    return (
        <>
            {template.templateDir === 'default' &&
                // <DefaultCart carts={carts} />
                <></>
            }
            {template.templateDir === 'theme1' &&
                <Container
                    templateDir="theme1"
                    theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
                >
                    <CartTheme1
                        carts={carts}
                        isHaveDefaultAddress={defaultAddress?.id ? true : false}
                    />
                </Container>
            }
        </>
    )
}