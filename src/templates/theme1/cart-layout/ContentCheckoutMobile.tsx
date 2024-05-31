import Iconify from "@/src/components/Iconify"
import ButtonClient from "@/src/lib/client/buttons/ButtonClient"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import Link from "next/link"

type Props = {
    subtotal: string
    isHaveDefaultAddress: boolean
    listLoadingUpdate: string[]
}

export default function ContentCheckoutMobile({
    subtotal,
    isHaveDefaultAddress,
    listLoadingUpdate
}: Props) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 px-8 py-3 bg-white space-y-1 shadow-[rgba(60,60,60,0.2)_0px_-2px_2px_0px]">
            <div className="flex justify-between items-center w-full space-x-2">
                <div className="flex flex-wrap items-center">
                    <TypographyClient
                        props={{
                            className: "text-[#737373] font-normal font-inter font-normal text-xs mr-1",
                            children: <></>
                        }}
                    >
                        Total:
                    </TypographyClient>
                    <TypographyClient
                        props={{
                            className: "text-[#171717] font-inter font-bold text-sm",
                            children: <></>
                        }}
                    >
                        {subtotal}
                    </TypographyClient>
                </div>
                {listLoadingUpdate.length === 0 ?
                    <Link
                        href={isHaveDefaultAddress ? '/checkout' : '/profile/address-list'}
                        className="w-fit"
                    >
                        <ButtonClient
                            props={{
                                size: "md",
                                className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-fit hover:opacity-[0.96] transition-all",
                                children: <></>,
                            }}
                        >
                            Checkout
                        </ButtonClient>
                    </Link>
                    :
                    <ButtonClient
                        props={{
                            size: "md",
                            className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-fit hover:opacity-[0.96] transition-all",
                            children: <></>,
                            loading: true
                        }}
                    >
                        Checkout
                    </ButtonClient>
                }
            </div>
            {!isHaveDefaultAddress &&
                <div className="flex justify-center space-x-1 w-full">
                    <Iconify
                        icon="uim:exclamation-circle"
                        className="text-red-600 mt-[-2px]"
                    />
                    <TypographyClient
                        title="You have not set a primary address. Please set your primary address first."
                        props={{
                            children: <></>,
                            className: 'font-inter text-red-600 text-center font-semibold text-xs'
                        }}
                    />
                </div>
            }
        </div>
    )
}