import Container from "@/src/components/container"
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate"
import SkeletonProductTheme1 from "@/src/templates/theme1/product/loaders/SkeletonProduct"

export default async function Loading() {
    const template = await getTemplate()
    return (
        <Container
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            templateDir={template.templateDir}
        >
            {template.templateDir === 'theme1' && <SkeletonProductTheme1 total={12} />}
        </Container>
    )
}