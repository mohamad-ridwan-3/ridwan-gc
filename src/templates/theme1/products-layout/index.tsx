import Product from "@/src/components/product"
import { ProuductT } from "@/src/types/products"
import { TemplateDirT } from "@/src/types/template"
import Link from "next/link"
import CardProduct from "../product/loaders/CardProduct"
import NoProducts from "../product/NoProducts"

type Props = {
    products: ProuductT[]
    loading?: boolean
    total: number
} & TemplateDirT

export default function ProductsLayoutTheme1({
    products,
    templateDir,
    loading,
    total
}: Props) {
    return (
        <>
            <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-4 screen-tm1-lg:grid-cols-6 gap-8 pt-8">
                {products.map((item, i) => (
                    <Link
                        key={i}
                        href={`/products/${item.slug as string}`}
                    >
                        <Product
                            name={item.name}
                            image={item.image}
                            // discount={item.discount}
                            price={item.price}
                            // category={item.category}
                            has_discount={item.has_discount}
                            templateDir={templateDir}
                            loading={i <= 12 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={i <= 12 ? 'high' : undefined}
                        />
                    </Link>
                ))}
                {loading &&
                    <CardProduct total={total} />
                }
            </div>
            {products.length === 0 && <NoProducts/>}
        </>
    )
}