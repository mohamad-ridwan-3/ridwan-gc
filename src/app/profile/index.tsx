'use client'

import { useState } from "react";
import { CardProfileInfoT, ListCustomerAddressT } from "@/src/types/profile";
import CardProfile from "./Card";

type Props = {
    defaultAddress: ListCustomerAddressT
}

export default function ProfileLayoutTheme1({
    defaultAddress
}: Props) {
    const getDefaultAddress = defaultAddress ?
        `${defaultAddress.name} (${defaultAddress.phone}), ${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.country}, ${defaultAddress.postcode}` :
        'You do not have any default address, please go to your address settings and set your desired default address'
    const [cardInfo, setCardInfo] = useState<CardProfileInfoT[]>([
        {
            title: 'My Address',
            desc: 'View or change entries in my address book.',
            btnName: 'Change Default Address',
            slug: '/profile/address-list',
            icon: 'mdi:map-marker',
            value: getDefaultAddress,
            label: 'address'
        },
        {
            title: 'My Orders',
            desc: 'You can view the products that you have purchased and your order status here.',
            btnName: 'View',
            slug: '/profile/orders-history',
            icon: 'lets-icons:order-duotone',
            label: 'orders'
        },
        {
            title: 'My Profile',
            desc: 'View or change my account information including name, email address and contact number.',
            btnName: 'Edit Details',
            slug: '/profile/profile-update',
            icon: 'lets-icons:user-duotone',
            label: 'detail-profile'
        },
        {
            title: 'My Password',
            desc: 'Press button below to change your profile password information.',
            btnName: 'Edit Password',
            slug: '/profile/change-password',
            icon: 'lets-icons:key-duotone-line',
            label: 'change-password'
        },
    ])
    return (
        <>
            <div className="mt-12 grid grid-cols-1 screen-tm1-sm:grid-cols-2 screen-tm1-lg:grid-cols-3 gap-6">
                {cardInfo.map((item, i) => {
                    return (
                        <CardProfile
                            key={i}
                            title={item.title}
                            desc={item.desc}
                            btnName={item.btnName}
                            slug={item.slug}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                        />
                    )
                })}
            </div>
        </>
    )
}