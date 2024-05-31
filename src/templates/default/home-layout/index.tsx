import AllProducts from "@/src/templates/default/AllProducts";
import Banner from "@/src/templates/default/banner/Banner";
import { ProuductT } from "@/src/types/products";
import { TemplateDirT } from "@/src/types/template";

type ImgT = {
    img: string
    path: string
}

type Props = {
    banners: ImgT[]
    products: ProuductT[]
} & TemplateDirT

export default function HomeLayout({
    banners,
    products,
    templateDir
}: Props) {
    return (
        <>
            <Banner banners={banners} />
            <AllProducts
                products={products}
                templateDir={templateDir}
            />
        </>
    )
}