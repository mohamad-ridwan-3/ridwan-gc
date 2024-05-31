import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import Link from "next/link";

type Props = {
    href: string
}

export default function BackIconBtn({
    href
}: Props) {
    return (
        <Link href={href} className="w-fit">
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
    )
}