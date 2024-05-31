import Container from "@/src/components/container"
import { FooterDataT } from "@/src/types/footer"
import Link from "next/link"
import FooterMenu from "./FooterMenu"
import SelectCurrency from "./SelectCurrency"
import { TemplateDirT } from "@/src/types/template"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"

type MenuFooterT = {
    title: string
    children: {
        name: string
        path: string
    }[]
}

type PropsFooterMenu = {
    menu: MenuFooterT[]
}

type CurrencyT = {
    name: string
    value: string
}

type Props =
    PropsFooterMenu &
    FooterDataT &
    TemplateDirT &
    {
        currencys: CurrencyT[]
    }

export default function FooterTheme1({
    menu,
    copyRight,
    poweredBy,
    poweredHref,
    currencys,
    templateDir
}: Props) {
    const bgFooter = 'bg-[#fafafa]'
    return (
        <footer
            className={`${bgFooter} flex flex-col w-full mt-16`}
        >
            <Container templateDir={templateDir}>
                {/* <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-3 gap-8 py-16">
                    <FooterMenu menu={menu} />
                </div> */}

                <div className="flex items-center mb-4 flex-wrap pt-10">
                    <TypographyClient
                        props={{
                            className: "font-inter font-normal text-[#737373] text-sm mb-0 mr-1.5",
                            children: <></>
                        }}
                    >
                        Change currency:
                    </TypographyClient>
                    <SelectCurrency currencys={currencys} />
                </div>

                <div className="flex flex-col justify-between screen-tm1-sm:flex-row screen-tm1-sm:items-center border-t py-10">
                    <TypographyClient
                        props={{
                            className: "font-inter font-normal text-[#737373] text-sm",
                            children: <></>
                        }}
                    >
                        {copyRight}
                    </TypographyClient>

                    <TypographyClient
                        props={{
                            className: "flex text-sm font-inter font-normal text-[#737373]",
                            children: <></>
                        }}
                    >
                        Powered by
                        <Link
                            href={poweredHref}
                            className="ml-1 text-center"
                        >
                            {poweredBy}
                        </Link>
                    </TypographyClient>
                </div>
            </Container>
        </footer>
    )
}