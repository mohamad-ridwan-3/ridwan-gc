import Container from "@/src/components/container"
import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress"
import getRegions from "@/src/lib/server-actions/region/getRegions"
import { notFound } from "next/navigation"
import EditCustomerAddressPage from "."
import { ListCustomerAddressT } from "@/src/types/profile"

type ParamsT = {
    params: {
        id: string
    }
}

export default async function EditAddress({
    params
}: ParamsT) {
    const { id } = params
    const listCustomerAddress = await getListCustomerAddress()
    let newListCustomerAddress = {} as ListCustomerAddressT
    function validateId(): 'success' | 'not-found' {
        if (
            listCustomerAddress?.result &&
            listCustomerAddress?.data?.length > 0
        ) {
            const findId = listCustomerAddress.data.find((item) => `${item.id}` === id)
            if(findId){
                newListCustomerAddress = findId
            }
            return findId?.id ? 'success' : 'not-found'
        }
        return 'not-found'
    }
    if (validateId() === 'not-found') {
        notFound()
    }
    const region = await getRegions('region.json')
    const state = await getRegions('state.json')
    const district = await getRegions('district.json')
    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={'theme1'}
        >
            <EditCustomerAddressPage
                region={region}
                state={state}
                district={district}
                data={newListCustomerAddress}
                id={id}
            />
        </Container>
    )
}