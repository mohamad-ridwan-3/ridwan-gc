import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    subtotal: string
    isHaveDefaultAddress: boolean
    listLoadingUpdate: string[]
}

export default function ContentCheckout({
    subtotal,
    isHaveDefaultAddress,
    listLoadingUpdate
}: Props) {
    const tablet = useMediaQuery('(min-width: 868px)')
    return (
        <div className={`mt-6 ${tablet ? 'flex' : 'hidden'}`}>
            <div className="flex flex-col sticky top-[5rem] border shadow-md rounded-lg py-4 px-3 h-fit">
                <div className="border rounded-md px-4 py-3.5 bg-[#FAFAFA] flex flex-col space-y-2">
                    <div className="flex justify-between space-x-1">
                        <TypographyClient
                            props={{
                                className: "text-[#171717] font-normal font-inter font-semibold",
                                children: <></>
                            }}
                        >
                            Your Total
                        </TypographyClient>

                        <TypographyClient
                            props={{
                                className: "text-[#171717] font-inter font-semibold",
                                children: <></>
                            }}
                        >
                            {subtotal}
                        </TypographyClient>
                    </div>

                    <TypographyClient
                        props={{
                            className: "text-[#737373] font-inter text-sm font-normal",
                            children: <></>
                        }}
                    >
                        Shipping will be calculated in the next step
                    </TypographyClient>
                </div>

                <div className="flex flex-col mt-10">
                    {listLoadingUpdate.length === 0 ?
                        <Link
                            href={isHaveDefaultAddress ? '/checkout' : '/profile/address-list'}
                            className="mx-auto w-full"
                        >
                            <ButtonClient
                                props={{
                                    size: "lg",
                                    className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-full hover:opacity-[0.96] transition-all justify-center",
                                    children: <></>,
                                }}
                            >
                                Checkout
                            </ButtonClient>
                        </Link> :
                        <div className="cursor-not-allowed">
                            <ButtonClient
                                props={{
                                    size: "lg",
                                    className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-full hover:opacity-[0.96] transition-all justify-center",
                                    children: <></>,
                                    loading: true
                                }}
                            >
                                Checkout
                            </ButtonClient>
                        </div>
                    }

                    {!isHaveDefaultAddress &&
                        <div className="flex mx-auto mt-4 space-x-1">
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
            </div>
        </div>
    )
}