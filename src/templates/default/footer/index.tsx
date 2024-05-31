import Iconify from "@/src/components/Iconify";
import { FooterDataT } from "@/src/types/footer";
import Link from "next/link";
import WrappFooter from "./WrapFooter";
import { TemplateDirT } from "@/src/types/template";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = FooterDataT & TemplateDirT

export default function DefaultFooter({
    copyRight,
    poweredBy,
    facebookHref,
    poweredHref,
    templateDir
}: Props) {
    // const pathname = usePathname()

    return (
        <WrappFooter
            templateDir={templateDir}
        >
            <hr className="w-[50px] border-t-[1.5px] border-t-black flex my-5 mx-auto" />
            <Link
                href={facebookHref as string}
                className="mx-auto py-3"
            >
                <Iconify
                    icon="basil:facebook-outline"
                    height={20}
                    width={20}
                />
            </Link>
            <div className="flex flex-nowrap flex-col screen-d-sm:flex-wrap screen-d-sm:flex-row mx-auto mb-4">
                <TypographyClient
                    props={{
                        className:"text-[0.8rem] font-apple-system font-normal text-center",
                        children:<></>
                    }}
                >
                    {copyRight}
                </TypographyClient>
                <TypographyClient
                    props={{
                        className:"flex text-[0.8rem] font-apple-system font-normal ml-1 justify-center",
                        children: <></>
                    }}
                >
                    Powered by
                    <Link
                        href={poweredHref}
                        className="transition-all hover:text-gray-800 ml-1 text-center"
                    >
                        {poweredBy}
                    </Link>
                </TypographyClient>
            </div>
        </WrappFooter>
    )
}