import Container from "../../../components/container";
import { notFound } from "next/navigation";
import WrapSearchLayoutTheme1 from "@/src/templates/theme1/search-layout/Wrap";
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate";
import { getProducts } from "@/src/lib/server-actions/products/getProducts";
import { ResultProductDataT } from "@/src/types/products";

type ParamsT = {
    params:{
        product: string,
    }
    searchParams: {
        query: string
    }
}

export const dynamic = 'force-dynamic'

export default async function Search(params: ParamsT) {
    const template = await getTemplate()
    if(template.templateDir !== 'theme1'){
        return notFound()
    }
    if(!params?.searchParams?.query){
        return notFound()
    }
    const products = await getProducts(12, params.searchParams.query) as ResultProductDataT

    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            {template.templateDir === 'theme1' &&
                <WrapSearchLayoutTheme1
                    data={products}
                />
            }
        </Container>
    )
}