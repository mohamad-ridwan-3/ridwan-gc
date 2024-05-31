import CardClient from "@/src/lib/client/cards/CardClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { ListCustomerAddressT } from "@/src/types/profile";
import { Dispatch, SetStateAction } from "react";
import BtnActions from "./BtnActions";

type Props = {
    customerAddress: ListCustomerAddressT[]
    setCustomerAddress: Dispatch<SetStateAction<ListCustomerAddressT[]>>
}

export default function ListAddress({
    customerAddress,
    setCustomerAddress
}: Props) {
    return (
        <div className={`grid ${customerAddress.length <= 2 ? 'grid-cols-1 screen-tm1-sm:grid-cols-2 screen-tm1-lg:grid-cols-2' : 'grid-cols-1 screen-tm1-sm:grid-cols-2 screen-tm1-lg:grid-cols-3'} gap-6`}>
            {customerAddress.map((item, i) => {
                return (
                    <CardClient
                        key={i}
                        props={{
                            children: <></>,
                            className: 'w-full border'
                        }}
                    >
                        <div className="py-6 px-4 border-b border-gray-200 flex items-center justify-between">
                            <TypographyClient
                                title={item.name}
                                props={{
                                    children: <></>,
                                    as: 'h1',
                                    className: 'font-inter text-[#171717] font-semibold mr-3'
                                }}
                            />
                            <BtnActions
                                id={item.id}
                                setCustomerAddress={setCustomerAddress}
                            />
                        </div>

                        <div className="py-6 px-4 flex flex-col">
                            {/* Name */}
                            <TypographyClient
                                title={`${item.name} (${item.phone})`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-[#171717] font-normal'
                                }}
                            />
                            <TypographyClient
                                title={`${item.address}`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-[#171717] font-normal'
                                }}
                            />
                            <TypographyClient
                                title={`${item.city}, ${item.state}, ${item.country}`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-[#171717] font-normal'
                                }}
                            />
                            <TypographyClient
                                title={`${item.postcode}`}
                                props={{
                                    children: <></>,
                                    className: 'font-inter text-[#171717] font-normal'
                                }}
                            />
                            {/* label */}
                            <div className="flex items-center space-x-1 mt-2">
                                <TypographyClient
                                    title={`${item.type}`}
                                    props={{
                                        children: <></>,
                                        className: 'font-inter text-[#171717] font-normal border py-[0.1rem] px-1 text-xs rounded-md border-black'
                                    }}
                                />
                                {item.is_default === 1 &&
                                    <TypographyClient
                                        title="MAIN ADDRESS"
                                        props={{
                                            children: <></>,
                                            className: 'font-inter text-[#c2890e] font-normal border py-[0.1rem] px-1 text-xs rounded-md border-[#c2890e]'
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </CardClient>
                )
            })}
        </div>
    )
}