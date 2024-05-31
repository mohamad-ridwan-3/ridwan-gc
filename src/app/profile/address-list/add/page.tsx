import Container from "@/src/components/container";
import AddAddressTheme1 from "@/src/app/profile/address-list/add";
import getRegions from "@/src/lib/server-actions/region/getRegions";
import BackIconBtn from "../../BackIconBtn";

export default async function AddNewAddress() {
    const region = await getRegions('region.json')
    const state = await getRegions('state.json')
    const district = await getRegions('district.json')
    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={'theme1'}
        >
            <div className="mt-4">
                <BackIconBtn
                    href="/profile/address-list"
                />
            </div>
            <AddAddressTheme1
                region={region}
                state={state}
                district={district}
            />
        </Container>
    )
}