import { Dispatch, SetStateAction, useState } from "react";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import deleteCustomerAddress from "@/src/lib/server-actions/customer/deleteCustomerAddress";
import getListCustomerAddress from "@/src/lib/server-actions/customer/getListCustomerAddress";
import { ListCustomerAddressT } from "@/src/types/profile";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
    id: number
    setCustomerAddress: Dispatch<SetStateAction<ListCustomerAddressT[]>>
}

export default function BtnActions({
    id,
    setCustomerAddress
}: Props) {
    const [loading, setLoading] = useState<boolean>(false)

    async function handleDelete(): Promise<void> {
        setLoading(true)
        const result = await deleteCustomerAddress({ id })
        if (result?.result) {
            const result = await getListCustomerAddress()
            if (result?.result) {
                setCustomerAddress(result.data)
            } else {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
            }
            setLoading(false)
        } else {
            toast.dismiss()
            toast.error(result?.message ?? 'There is an error. Please try again')
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center space-x-2">
            {!loading ?
                <Link href={`/profile/address-list/edit/${id}`}>
                    <ButtonClient
                        title="Edit"
                        props={{
                            children: <></>,
                            variant: 'outlined',
                            size: 'sm',
                            className: 'font-inter text-xs text-[#171717] py-1 px-2'
                        }}
                    />
                </Link>
                :
                <ButtonClient
                    title="Edit"
                    props={{
                        children: <></>,
                        variant: 'outlined',
                        size: 'sm',
                        className: 'font-inter text-xs text-[#171717] py-1 px-2',
                        disabled: true
                    }}
                />
            }

            <ButtonClient
                title="Delete"
                props={{
                    children: <></>,
                    variant: 'outlined',
                    size: 'sm',
                    color: 'red',
                    className: 'font-inter text-xs py-1 px-2',
                    disabled: loading,
                    loading: loading,
                    onClick: handleDelete
                }}
            />
        </div>
    )
}