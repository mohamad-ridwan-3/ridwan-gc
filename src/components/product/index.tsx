import DefaultProduct from "@/src/templates/default/product";
import ProductTheme1 from "@/src/templates/theme1/product";
import { ProuductT } from "@/src/types/products";
import { TemplateDirT } from "@/src/types/template";

type Props = ProuductT & TemplateDirT & {
    loading?: string
    fetchPriority?: "high" | "low" | "auto",
    decoding?: "auto" | "async" | "sync"
}

export default function Product({
    image,
    name,
    // discount,
    price,
    // category,
    // isStaticData,
    templateDir,
    loading,
    fetchPriority,
    decoding,
    has_discount
}: Props) {
    // const template = useAppSelector(state=>state.template)

    return (
        <>
            {templateDir === 'default' &&
                <DefaultProduct
                    image={image}
                    name={name}
                    price={price}
                    // discount={discount}
                    // category={category}
                    // isStaticData={isStaticData}
                    has_discount={has_discount}
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                />
            }
            {templateDir === 'theme1' &&
                <ProductTheme1
                    image={image}
                    name={name}
                    price={price}
                    // discount={discount}
                    // category={category}
                    // isStaticData={isStaticData}
                    has_discount={has_discount}
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority}
                />
            }
        </>
    )
}