import Container from "@/src/components/container";
import DefaultCategory from "@/src/templates/default/category-layout";
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate";
import WrapCategoryLayoutTheme1 from "@/src/templates/theme1/category-layout/Wrap";
import { notFound } from "next/navigation";
import { ResultProductDataT } from "@/src/types/products";
import { getProducts } from "@/src/lib/server-actions/products/getProducts";

type ParamsT = {
    params: {
        category: string
    }
}

export const dynamic = 'force-dynamic'

export default async function Category({params}: ParamsT) {
    const {category} = params

    function validateRoute():'success' | 'not-found'{
        if(category.length <= 3){
            return 'success'
        }
        return 'not-found'
    }
    if(validateRoute() === 'not-found'){
        notFound()
    }
    const template = await getTemplate()

    const changeType= category as never
    function catchParams():string{
        if(category.length > 1){
            if(category.length === 2){
                return `&collection=${changeType[0]}&category=${changeType[1]}`
            }
            return `&collection=${changeType[0]}&category=${changeType[1]}&subcategory=${changeType[2]}`
        }
        return `&collection=${changeType[0]}`
    }
    const currentParams = catchParams()
    const products: ResultProductDataT = await getProducts(
        template.templateDir === 'default' ?
        20:
        12,
        undefined,
        currentParams
    ) as ResultProductDataT

    if(!products?.data?.list || products.data.list.length === 0){
        notFound()
    }
    
    const catchTitlePage: string = (changeType as string[]).join(' / ').replaceAll('-', ' ').toUpperCase()

    return (
        <Container
            defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            {template.templateDir === 'default' &&
                <DefaultCategory
                    products={[]}
                    title={catchTitlePage}
                    templateDir={template.templateDir}
                />
            }
            {template.templateDir === 'theme1' &&
                <WrapCategoryLayoutTheme1
                    data={products}
                    title={catchTitlePage}
                    templateDir={template.templateDir}
                />
            }
        </Container>
    )
}