import Container from "../components/container"
import { ResultProductDataT } from "../types/products"
import Link from "next/link"
import Product from "../components/product"
import HeaderContent from "../lib/server/not-found-content/Header"
import { getTemplate } from "../lib/server-actions/templates/getTemplate"
import TypographyClient from "../lib/client/typography/TypographyClienct"
import { getProducts } from "../lib/server-actions/products/getProducts"

export const dynamic = 'force-dynamic'

export default async function NotFound() {
    const template = await getTemplate()
    const products: ResultProductDataT = await getProducts(
        template.templateDir === 'default' ?
            8 :
            6
    ) as ResultProductDataT

    return (
        <div className="min-h-[65vh] min-container-h:min-h-screen w-full flex flex-col">
            <div className="flex flex-col font-inter bg-[#fafafa] w-screen">
                <HeaderContent />
            </div>
            <div className="p-8 flex flex-col">
                {template.isDomainAccess === false &&
                    <TypographyClient
                        props={{
                            variant: "h6",
                            className: "font-inter text-center text-[#737373]",
                            children: <></>
                        }}
                    >
                        404 - Invalid domain access...
                    </TypographyClient>
                }
            </div>
            {(
                template?.isDomainAccess === undefined ||
                template.isDomainAccess === null
            ) &&
                <Container
                    templateDir="theme1"
                >
                    <TypographyClient
                        props={{
                            className: "font-inter text-center text-[#737373] font-normal mb-12",
                            children: <></>
                        }}
                    >
                        but we found some new items that you can explore before retyping the URL. select this product, or select the navigation buttons above.
                    </TypographyClient>

                    <div className={
                        template.templateDir === 'default' ?
                            'grid grid-cols-2 screen-d-md:grid-cols-4 screen-d-lg:grid-cols-6 gap-8' :
                            template.templateDir === 'theme1' ?
                                'grid grid-cols-2 screen-tm1-sm:grid-cols-4 screen-tm1-lg:grid-cols-6 gap-8' :
                                ''
                    }>
                        {products.data.list.map((item, i) => (
                            <Link
                                key={i}
                                href={`/products/${item.slug}`}
                            >
                                <Product
                                    name={item.name}
                                    image={item.image}
                                    // discount={item.discount}
                                    price={item.price}
                                    // category={item.category}
                                    templateDir={template.templateDir}
                                    has_discount={item.has_discount}
                                    loading={i <= 6 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchPriority={i <= 6 ? 'high' : undefined}
                                />
                            </Link>
                        ))}
                    </div>
                </Container>
            }
        </div>
    )
}