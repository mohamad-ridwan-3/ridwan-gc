import Product from "@/src/components/product";
import Section from "@/src/components/section";
import { ProuductT } from "@/src/types/products";
import { TemplateDirT } from "@/src/types/template";
import Link from "next/link";

type Props = {
    products: ProuductT[]
} & TemplateDirT

export default function DefaultProductsLayout({
    products,
    templateDir
}: Props) {
    return (
        <Section
            title="All Products"
        >
            <div className="grid grid-cols-2 screen-d-sm:grid-cols-4 screen-d-lg:grid-cols-6 gap-8">
                {/* {products.map((item, i) => (
                    <Link
                        key={i}
                        href={item.path as string}
                    >
                        <Product
                            name={item.name}
                            img={item.img}
                            discount={item.discount}
                            price={item.price}
                            category={item.category}
                            templateDir={templateDir}
                            loading={i <= 4 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={i <= 4 ? 'high' : undefined}
                        />
                    </Link>
                ))} */}
            </div>
        </Section>
    )
}