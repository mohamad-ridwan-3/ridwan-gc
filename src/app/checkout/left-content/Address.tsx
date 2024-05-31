import Iconify from "@/src/components/Iconify";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { ListCustomerAddressT } from "@/src/types/profile";

type Props = {
    defaultAddress: ListCustomerAddressT
}

export default function Address({
    defaultAddress
}: Props) {
    return (
        <div className="flex space-x-2 mt-6 pt-4">
            <div>
                <Iconify
                    icon="mdi:map-marker"
                    className="text-[#171717]"
                />
            </div>
            <div>
                <TypographyClient
                    title={`${defaultAddress.name} (${defaultAddress.phone})`}
                    props={{
                        children: <></>,
                        className: 'font-inter font-semibold'
                    }}
                />
                <TypographyClient
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#171717] font-normal'
                    }}
                >
                    <span className="px-2 py-[0.2rem] rounded-full text-[11px] mr-1 bg-[#171717] text-white">
                        {defaultAddress.type}
                    </span>{defaultAddress.address}, {defaultAddress.state}, {defaultAddress.city}, {defaultAddress.country}, {defaultAddress.postcode}
                </TypographyClient>
            </div>
        </div>
    )
}