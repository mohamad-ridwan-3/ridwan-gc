import { ListCustomerAddressT } from "@/src/types/profile";
import HeaderContent from "../../../Header";
import Form from "../../Form";
import BackIconBtn from "../../../BackIconBtn";
import BottomBackBtn from "../../../BottomBackBtn";

type Props = {
    region: any
    state: any
    district: any
    data: ListCustomerAddressT
    id: string
}

export default function EditCustomerAddressPage({
    region,
    state,
    district,
    data,
    id
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="mt-4">
                <BackIconBtn
                    href="/profile/address-list"
                />
            </div>
            <HeaderContent
                title="Edit Address"
                desc="You can now update your address details below."
            />

            <div className="flex items-center justify-center w-full mt-8">
                <div className="w-full screen-tm1-sm:w-[35rem]">
                    <Form
                        region={region}
                        state={state}
                        district={district}
                        data={data}
                        id={id}
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