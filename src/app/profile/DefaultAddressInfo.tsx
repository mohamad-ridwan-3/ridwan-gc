import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    defaultAddress: string
}

export default function DefaultAddressInfo({
    defaultAddress
}: Props){
    return(
        <div className="flex flex-col space-y-3">
            <TypographyClient
                title="Default Address:"
                props={{
                    children: <></>,
                    className: 'font-inter font-semibold text-sm text-[#171717]'
                }}
            />
            <TypographyClient
                title={defaultAddress}
                props={{
                    children: <></>,
                    className: 'font-inter text-sm text-[#737373] text-center'
                }}
            />
        </div>
    )
}