import Container from "@/src/components/container"
import { getTemplate } from "@/src/lib/server-actions/templates/getTemplate"
import SkeletonCart from "@/src/templates/default/cart-layout/loaders"
import SkeletonCartTheme1 from "@/src/templates/theme1/cart-layout/loaders"

export default async function Loading() {
    const template = await getTemplate()
    return (
        <Container
            templateDir={template.templateDir}
            theme1ClassName="min-h-[65vh] min-container-h:min-h-screen"
            defaultClassName="min-h-[65vh] min-container-h:min-h-screen"
        >
            {template.templateDir === 'default' &&
                <SkeletonCart />
            }
            {template.templateDir === 'theme1' &&
                <SkeletonCartTheme1 />
            }
        </Container>
    )
}