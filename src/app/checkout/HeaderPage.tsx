import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import { staticImages } from "@/src/utils";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function HeaderPage() {
    return (
        <div>
            <Link
                href={"/"}
            >
                <img
                    src={`${staticImages}/gangco.png`}
                    className="max-w-[100px]"
                    alt="storefront"
                    height={100}
                    width={100}
                />
            </Link>

            <div className="flex items-center mt-8 space-x-2">
                <Link href="/cart">
                    <ButtonClient
                        props={{
                            children: <></>,
                            variant: 'text',
                            size: 'sm',
                            className: 'rounded-full p-0'
                        }}
                    >
                        <Iconify
                            icon="iconamoon:arrow-left-2-light"
                        />
                    </ButtonClient>
                </Link>
                <Typography
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    variant="h1"
                    className="text-[#171717] font-bold text-3xl font-inter"
                >

                    Checkout
                </Typography>
            </div>
        </div>
    )
}