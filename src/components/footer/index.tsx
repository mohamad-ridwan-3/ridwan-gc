import { FooterDataT } from "@/src/types/footer";
import DefaultFooter from "@/src/templates/default/footer";
import FooterTheme1 from "@/src/templates/theme1/footer";
import { TemplateDirT } from "@/src/types/template";
import { ResultCollectionsT } from "@/src/types/navbar";

type MenuFooterT = {
    title: string
    children: {
        name: string
        path: string
    }[]
}

type CurrencyT = {
    name: string
    value: string
}

type Props = TemplateDirT & {
    collections: ResultCollectionsT
}

export default function Footer({
    templateDir,
    collections
}: Props) {
    // const template = useAppSelector(state => state.template)

    const footerData: FooterDataT = {
        copyRight: '© 2024 {{Store Name}}. All rights reserved.',
        poweredBy: 'Gangco',
        poweredHref: 'https://gangco.io',
        facebookHref: 'https://www.facebook.com/gangco.io'
    }

    // footer theme1 demo
    const menuFooter: MenuFooterT[] = [
        {
            title: 'Saleor',
            children: [
                {
                    name: 'About',
                    path: '/'
                },
                {
                    name: 'Documentation',
                    path: '/'
                }
            ]
        },
        {
            title: 'Collections',
            children: [
                {
                    name: 'Featured Products',
                    path: '/'
                },
                {
                    name: 'Summer Picks',
                    path: '/'
                }
            ]
        },
    ]
    const currency: CurrencyT[] = [
        {
            name: 'AUD',
            value: 'aud'
        },
        {
            name: 'BRL',
            value: 'brl'
        },
        {
            name: 'CAD',
            value: 'cad'
        },
        {
            name: 'USD',
            value: 'usd'
        },
        {
            name: 'EUR',
            value: 'eur'
        },
        {
            name: 'GBP',
            value: 'gbp'
        },
        {
            name: 'INR',
            value: 'inr'
        },
        {
            name: 'JPY',
            value: 'jpy'
        },
        {
            name: 'PLN',
            value: 'pln'
        },
        {
            name: 'SAR',
            value: 'sar'
        },
    ]

    return (
        <>
            {/* {templateDir === 'default' &&
                <DefaultFooter
                    copyRight={footerData.copyRight}
                    facebookHref={footerData.facebookHref}
                    poweredBy={footerData.poweredBy}
                    poweredHref={footerData.poweredHref}
                    templateDir={templateDir}
                />
            } */}
            {templateDir === 'theme1' &&
                <FooterTheme1
                    menu={menuFooter}
                    copyRight={footerData.copyRight}
                    poweredBy={footerData.poweredBy}
                    poweredHref={footerData.poweredHref}
                    currencys={currency}
                    templateDir={templateDir}
                />
            }
        </>
    )
}