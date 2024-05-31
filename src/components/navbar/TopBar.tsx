import DefaultTopBar from "@/src/templates/default/navbar/DefaultTopBar"
import { TemplateDirT } from "@/src/types/template"

type Props = TemplateDirT

export default function TopBar({
    templateDir
}: Props){
    // const template = useAppSelector(state=>state.template)

    return(
        <>
            {templateDir === 'default' &&
                <DefaultTopBar/>
            }
        </>
    )
}