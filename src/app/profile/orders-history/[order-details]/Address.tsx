import Iconify from "@/src/components/Iconify";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { OrderDetailsAddressDataT } from "@/src/types/order";

type Props = {
    address: OrderDetailsAddressDataT
}

export default function Address({
    address
}: Props) {
    return (
        <div className="flex space-x-2 border-t py-4 border-b">
            <div>
                <Iconify
                    icon="mdi:map-marker"
                    className="text-[#171717]"
                />
            </div>
            <div>
                <TypographyClient
                    title={`${address.name} (${address.phone})`}
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
                    {address.address}, {address.city}, {address.state}, {address.country}, {address.postcode}
                </TypographyClient>
            </div>
        </div>
    )
}