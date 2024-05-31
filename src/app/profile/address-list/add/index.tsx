import BottomBackBtn from "../../BottomBackBtn";
import HeaderContent from "../../Header";
import Form from "../Form";

type Props = {
    region: any
    state: any
    district: any
}

export default function AddAddressTheme1({
    region,
    state,
    district
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <HeaderContent
                title="Add Address"
                desc="You can now add new address details below"
            />

            <div className="flex items-center justify-center w-full mt-8">
                <div className="w-full screen-tm1-sm:w-[35rem]">
                    <Form
                        region={region}
                        state={state}
                        district={district}
                    />
                </div>
            </div>
            <BottomBackBtn
                href="/profile/address-list"
                variant="outlined"
            />
        </div>
    )
}