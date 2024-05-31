import Container from "@/src/components/container";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate";
import Content from "./Content";
import { notFound } from "next/navigation";

type ParamsT = {
    params: {
        'custom-page': string
    }
}

export default async function CustomPage({params}: ParamsT) {
    const template = await getTemplate()

    function currentRoute():string{
        return 'about-us'
    }

    if(currentRoute() !== params["custom-page"]){
        return notFound()
    }

    const description = `
    <p>ROZYANA x WAWA EAU DE PARFUM kembali lagi.!!!<br>20k unit trial terjual dalam masa seminggu.!<br>JOMMM GRAB CEPAT!!<br>.<br>LIMITED UNIT!</p>
<p>Wawa keluarkan cuma 30k sahaja.! Will be sold out FOREVER!<br>.</p>
<p><strong><u>WAWA X ROZEYANA Eau De Parfume</u></strong></p>
<p><strong>SCENT:</strong></p>
<ul><li><strong>Aura Pesona</strong> (Amber Floral) - This fragrance is in the family of floral woody musk. It plays with the thin line between fresh and seductive, invoking the feel of women liberation and empowerment.</li><li><strong>Mandi Bunga</strong> (Floral Oriental) - This fragrance is aromatic and sensual. The unique scent of Jasmine expresses the wearer’s inner joy and the emancipation of one’s happiness. Suitable for a sophisticated and classy look.</li><li><strong>Buluh Perindu</strong> (Floral Woody) - This Amber Floral fragrance is as sweet as it is creamy. Aura Pesona is packed with decadent cherry flavour and exotic sweet scent – for the playful and free-spirited.</li><li><strong>Syurga Malam</strong> - Violet, Litchi, Plum, Tuberose, Patchouli, Vanilla, Citrus Limon (Lemon), Peel Oil Citrusnobilis (Mandarin Orange), Peel Oil Canariumiuzonicumgumnonvolatiles.</li><li><strong>Mengundang Cinta </strong>- Orange Blossom, Bergamot, Tuberose, Indian Jasmine, Vanilla, White Musk, Citrus Limon (Lemon), Peel Oil Citrusnobilis (Mandarin Orange), Peel Oil Canariumiuzonicumgumnonvolatiles.</li><li><strong>Seri Pagi</strong> -  Pink Pepper, Saffron, Rose, Cedarwood, Vanilla, Citrus Limon (Lemon), Peel Oil Citrusnobilis (Mandarin Orange), Peel Oil Canariumiuzonicumgumnonvolatiles.</li><li><strong>Permaisuri </strong>- Prunus Avium (Cherry) Oil, Rosa Damescena (Rose) Flower Oil, Vanilla Planifolia (Vanilla) Fruit Oil.</li><li><strong>Tiara&nbsp;</strong>- Citrus Nobilis (Mandarin Orange ) Peel Oil, Gardenia Tahitensis (Gardenia) Flower Oil, Jasminum Officinale (Jasmine) Flower Oil, Santalum Album (Sandalwood) Oil.</li><li><strong>Ratu </strong>- Citrus Nobilis (Mandarin Orange) Peel Oil, Gardenia Tahitensis (Gardenia) Flower Oil, Jasminum Officinale (Jasmine) Flower Oil. </li></ul>
<p><strong>HOW TO USE :</strong></p>
<ul><li>Shake well before use</li><li>Spritz generously onto your wrists, neck and pulse points</li></ul>
<p><strong>NOTES :</strong><br></p>
<p>Avoid direct contact with eyes. If contact occurs, rinse immediately with water. If any irritation develops, discontinue use and consult a doctor if necessary.</p>
<p><br></p>
    `

    return (
        <Container
            defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            <div className="pt-8">
                <TypographyClient
                    props={{
                        className: "font-inter font-semibold mb-8 text-xl",
                        children: <></>
                    }}
                >
                    About us
                </TypographyClient>
                <Content content={description}/>
            </div>
        </Container>
    )
}