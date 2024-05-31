import Container from "@/src/components/container"
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate"
import SkeletonProductDetailTheme1 from "@/src/templates/theme1/product-detail-layout/loaders/SkeletonProductDetail"

export default async function Loading() {
    const template = await getTemplate()
    return (
        <Container
            defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            {template.templateDir === 'default' && <SkeletonProductDetailTheme1 classButton="w-full"/>}
            {template.templateDir === 'theme1'&& <SkeletonProductDetailTheme1 />}
        </Container>
    )
}