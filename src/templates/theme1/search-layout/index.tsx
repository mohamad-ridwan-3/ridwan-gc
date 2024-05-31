import { ReactNode } from "react";
import Product from "@/src/components/product";
import { ProuductT } from "@/src/types/products";
import Link from "next/link";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import CardProduct from "../product/loaders/CardProduct";
import NoProducts from "../product/NoProducts";
import SpinnerClient from "@/src/lib/client/spinners/SpinnerClient";

type Props = {
    query: string
    products: ProuductT[]
    children: ReactNode
    isLoading: boolean
}

export default function SearchLayoutTheme1({
    query,
    products,
    children,
    isLoading
}: Props) {
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <TypographyClient
                    props={{
                        variant: "h1",
                        className: `text-[1.25rem] font-inter pb-8 text-start`,
                        children: <></>
                    }}
                >
                    Search results for {`"${query}"`}:
                </TypographyClient>
                {isLoading &&
                    <SpinnerClient
                        props={{
                            className: 'ml-2'
                        }}
                    />
                }
            </div>
            <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-4 screen-tm1-lg:grid-cols-6 gap-8">
                {products.map((item, i) => (
                    <Link
                        key={i}
                        href={`/products/${item.slug}`}
                        scroll={false}
                    >
                        <Product
                            name={item.name}
                            image={item.image}
                            // discount={item.discount}
                            price={item.price}
                            // category={item.category}
                            has_discount={item.has_discount}
                            templateDir="theme1"
                            loading={i <= 12 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={i <= 12 ? 'high' : undefined}
                        />
                    </Link>
                ))}
                {isLoading && <CardProduct total={6} />}
            </div>
            {!isLoading && products.length === 0 && <NoProducts />}
            {children}
        </div>
    )
}