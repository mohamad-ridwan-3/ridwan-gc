import { ResultListCustomerAddressT } from "@/src/types/profile";
import HeaderContent from "../Header";
import ClientWrap from "./ClientWrap";
import BackIconBtn from "../BackIconBtn";
import TitleWithNavigation from "../TitleWithNavigation";
import NoValuesOfContent from "../NoValuesOfContent";
import BottomBackBtn from "../BottomBackBtn";

type Props = {
    customerAddress: ResultListCustomerAddressT
}

export default function AddressListTheme1({
    customerAddress
}: Props) {
    return (
        <div className="flex flex-col mt-4 w-full">
            <BackIconBtn
                href="/profile"
            />
            <HeaderContent
                title="My Address list"
                desc="You are allowed to preset unlimited addresses here. Choose one of the address as your default shipping and billing address (Primary Address) for easy checkout."
            />
            <TitleWithNavigation
                href="address-list/add"
                btnName="Add Address"
                title="Address List"
                desc="Below are all of your preset addresses."
            />
            {customerAddress.data?.length > 0 ?
                <ClientWrap
                    customerAddress={customerAddress.data}
                />
                :
                <NoValuesOfContent
                    icon="mdi:map-marker-alert"
                    title="You don't have a list of addresses."
                    desc="A list of available addresses will be visible here."
                />
            }

            <BottomBackBtn
                href="/profile"
                variant="outlined"
            />
        </div>
    )
}