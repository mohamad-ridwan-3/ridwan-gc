import { ProuductT } from "@/src/types/products";
import Section from "../../components/section";
import Link from "next/link";
import Product from "../../components/product";
import { TemplateDirT } from "@/src/types/template";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";

type Props = {
    products: ProuductT[]
} & TemplateDirT

export default function AllProducts({
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

            <div className="border-t flex w-full justify-center mb-12 mt-8 py-4">
                <Link
                    href="/products"
                >
                    <ButtonClient
                        props={{
                            variant: "outlined",
                            className: "rounded-none hover:bg-black hover:text-white text-[#343a40]",
                            size: "md",
                            children: <></>
                        }}
                    >
                        <TypographyClient
                            props={{
                                className: "font-avant-garde text-[0.85rem] mb-0",
                                children: <></>
                            }}
                        >
                            VIEW ALL
                        </TypographyClient>
                    </ButtonClient>
                </Link>
            </div>
        </Section>
    )
}