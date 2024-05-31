import Container from "@/src/components/container";
import ProductDetailTheme1 from "@/src/templates/theme1/product-detail-layout";
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate";
import { getProductDetail } from "@/src/lib/server-actions/products/getProductDetail";
import { AttributeValueT, DataVariantProductT, SelectVariantT, VariantsT } from "@/src/types/products";
import NoProducts from "@/src/templates/theme1/product/NoProducts";
import { notFound } from "next/navigation";

type Params = {
    params: {
        detail: string
    }
}

export const dynamic = 'force-dynamic'

export default async function ProductDetail({
    params
}: Params) {
    const template = await getTemplate()
    const productDetail = await getProductDetail(params.detail)

    if (!productDetail?.data) {
        notFound()
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

    function handleSetAttribute(): DataVariantProductT {
        if (
            productDetail.data.have_attribute &&
            productDetail.data.attribute?.options?.length > 0
        ) {
            const options = productDetail.data.attribute.options
            const attribute = productDetail.data.attribute.attribute

            let createVariant: VariantsT[] = []
            let createSelectVariant = {} as SelectVariantT

            if (attribute?.length > 0) {
                const newOptions = options.map(opt => {
                    const newOptionsValue: AttributeValueT[] = opt.options.map(value => {
                        const getImage = attribute.filter(attrValue => attrValue.attribute_value_name === value)
                        if (getImage[0]?.attribute_value_second_name) {
                            return {
                                name: value,
                                image: getImage[0]?.image ?? '',
                            }
                        } else {
                            return {
                                name: value,
                                image: getImage[0]?.image ?? '',
                                stock: getImage[0]?.quantity
                            }
                        }
                    })

                    return {
                        name: opt.name,
                        value: opt.name,
                        attributeValue: newOptionsValue
                    }
                })
                createVariant = newOptions
            }
            const findAttribute = attribute.find(item =>
                item.attribute_value_name === createVariant[0]?.attributeValue[0]?.name
            ) as SelectVariantT
            // const findSecondAttribute = attribute.find(item =>
            //     item.attribute_value_second_name === createVariant[1]?.attributeValue[1]?.name
            // ) as SelectVariantT
            if (findAttribute?.attribute_name) {
                createSelectVariant = findAttribute
            }
            return {
                variant: createVariant,
                selectVariant: createSelectVariant
            }
        } else {
            return {
                variant: [],
                selectVariant: {} as SelectVariantT
            }
        }
    }

    return (
        <>
            {template.templateDir === 'default' &&
                <>
                    {/* <WrapDefaultProductDetail
                        varations={variations}
                        desc={description}
                        img={productDetail?.img}
                        name={productDetail?.name}
                        price={productDetail?.price}
                        discount={productDetail?.discount}
                    >
                        <AddToCart />
                    </WrapDefaultProductDetail> */}
                </>
            }
            {template.templateDir === 'theme1' &&
                <Container
                    theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
                    theme1CenterClassName="!px-0 screen-tm1-lg:!px-8"
                    templateDir={template.templateDir}
                >
                    {productDetail?.result ?
                        <ProductDetailTheme1
                            result={productDetail.result}
                            message={productDetail.message}
                            data={productDetail.data}
                            handleSetAttribute={handleSetAttribute()}
                        /> :
                        <div className="mt-12">
                            <NoProducts />
                        </div>
                    }
                </Container>
            }
        </>
    )
}