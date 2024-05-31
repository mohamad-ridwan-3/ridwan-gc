import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import Link from "next/link";

export default function NoListCart() {
    return (
        <>
            <TypographyClient
                props={{
                    className: "text-[#737373] font-inter my-12 text-sm font-normal",
                    children: <></>
                }}
            >
                Looks like you haven{`'`}t added any items to the cart yet.
            </TypographyClient>
            <Link
                href={'/products'}
            >
                <ButtonClient
                    props={{
                        className: "rounded-md shadow-none w-fit normal-case font-inter font-medium text-[16px] hover:opacity-[0.95] py-3 px-16",
                        size: "lg",
                        children: <></>
                    }}
                >
                    Explore products
                </ButtonClient>
            </Link>
        </>
    )
}