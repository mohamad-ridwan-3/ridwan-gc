import { ProuductT } from "@/src/types/products";
import AllProductsTheme1 from "../AllProductsTheme1";
import { TemplateDirT } from "@/src/types/template";

type Props = {
    products: ProuductT[]
} & TemplateDirT

export default function HomeLayoutTheme1({
    products,
    templateDir
}: Props) {
    return (
        <AllProductsTheme1
            products={products}
            templateDir={templateDir}
        />
    )
}