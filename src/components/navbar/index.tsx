import NavbarDefault from "@/src/templates/default/navbar";
import NavbarTheme1 from "@/src/templates/theme1/navbar";
import { DataCollectionsT, ResultCollectionsT } from "@/src/types/navbar";
import { TemplateDirT } from "@/src/types/template";

type Props = {
    user: any
    collections: ResultCollectionsT
} & TemplateDirT

export default async function Navbar({
    templateDir,
    user,
    collections
}: Props) {
    const defaultCollection: DataCollectionsT[] = [
        {
            name: 'All',
            slug: 'products',
            title: 'All',
            image: null,
            description: '',
            categories: [],
        }
    ]

    let dataCollection = [...defaultCollection]

    if(collections.data.length > 0){
        dataCollection = [...dataCollection, ...collections.data.map((item => item))]
    }

    return (
        <>
            {/* {templateDir === 'default' &&
                <NavbarDefault
                    listMenu={menu}
                    templateDir={templateDir}
                />
            } */}
            {templateDir === 'theme1' &&
                <NavbarTheme1
                    user={user}
                    listMenu={dataCollection}
                />
            }
        </>
    )
}