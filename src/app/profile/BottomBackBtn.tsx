import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import { ButtonProps } from "@material-tailwind/react";
import Link from "next/link";

type Props = {
    href: string
    variant?: ButtonProps['variant']
}

export default function BottomBackBtn({
    href,
    variant
}: Props) {
    return (
        <div className="flex justify-center mt-12">
            <Link href={href}>
                <ButtonClient
                    title="Back"
                    props={{
                        children: <></>,
                        variant: variant,
                        className: 'font-inter'
                    }}
                />
            </Link>
        </div>
    )
}