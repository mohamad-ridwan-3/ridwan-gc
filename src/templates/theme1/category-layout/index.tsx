import Product from "@/src/components/product"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import { ProuductT } from "@/src/types/products"
import { TemplateDirT } from "@/src/types/template"
import Link from "next/link"
import NoProducts from "../product/NoProducts"

type Props = {
    products: ProuductT[]
    title: string
} & TemplateDirT

export default function CategoryTheme1({
    products,
    title,
    templateDir
}: Props) {
    return (
        <div className="pt-8">
            <TypographyClient
                props={{
                    className: "font-inter font-semibold mb-8 text-xl",
                    children: <></>
                }}
            >
                {title}
            </TypographyClient>
            <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-4 screen-tm1-lg:grid-cols-6 gap-8">
                {products.map((item, i) => (
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
                            templateDir={templateDir}
                            has_discount={item.has_discount}
                            loading={i <= 12 ? 'eager' : 'lazy'}
                            fetchPriority={i <= 12 ? 'high' : undefined}
                            decoding="async"
                        />
                    </Link>
                ))}
            </div>
            {products.length === 0 && <NoProducts />}
        </div>
    )
}