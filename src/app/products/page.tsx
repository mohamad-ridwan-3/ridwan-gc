import Container from "../../components/container";
import { ResultProductDataT } from "../../types/products";
import DefaultProductsLayout from "../../templates/default/products-layout";
import WrapProductLayoutTheme1 from "@/src/templates/theme1/products-layout/Wrap";
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate";
import { getProducts } from "@/src/lib/server-actions/products/getProducts";

export const dynamic = 'force-dynamic'

export default async function Products() {
    const template = await getTemplate()
    const products: ResultProductDataT = await getProducts(
        template.templateDir === 'default' ?
            20 :
            12
    ) as ResultProductDataT

    return (
        <Container
            defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            {template.templateDir === 'default' &&
                <DefaultProductsLayout
                    products={products.data.list}
                    templateDir={template.templateDir}
                />
            }
            {template.templateDir === 'theme1' &&
                <WrapProductLayoutTheme1
                    data={products}
                    templateDir={template.templateDir}
                />
            }
        </Container>
    )
}