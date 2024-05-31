import { ReactNode } from "react"
import DefaultContainer from "@/src/templates/default/container"
import ContainerTheme1 from "@/src/templates/theme1/container"
import { TemplateDirT } from "@/src/types/template"

type Props = {
    children: ReactNode
    defaultClassName?: string
    theme1ClassName?: string
    theme1CenterClassName?: string
} & TemplateDirT

export default function Container({
    children,
    defaultClassName,
    theme1ClassName,
    templateDir,
    theme1CenterClassName
}: Props) {
    return (
        <>
            {templateDir === 'default' &&
                <DefaultContainer className={defaultClassName}>
                    {children}
                </DefaultContainer>
            }
            {templateDir === 'theme1' &&
                <ContainerTheme1
                    className={theme1ClassName}
                    centerClassName={theme1CenterClassName}
                >
                    {children}
                </ContainerTheme1>
            }
        </>
    )
}