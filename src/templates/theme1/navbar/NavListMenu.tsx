import { DataCollectionsT } from "@/src/types/navbar"
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import Link from "next/link"
import { useState } from "react"

type PropsNavList = {
    listMenu: DataCollectionsT[]
}

export default function NavListMenu({
    listMenu
}: PropsNavList) {
    const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null)

    return (
        <div className="w-full gap-6 screen-d-md:flex hidden h-full ml-0 mb-0">
            {listMenu.map((item, i) => (
                <Menu
                    key={i}
                    allowHover
                    open={item.categories.length > 0 && isMenuOpen === i ? true : false}
                    handler={(e) => {
                        if (item?.categories && e) {
                            setIsMenuOpen(i)
                            return
                        }
                        setIsMenuOpen(null)
                    }}
                >
                    <MenuHandler
                        className="h-full text-sm text-[#737373] hover:text-gray-900 transition-all font-inter font-medium flex"
                    >
                        <Link
                            href={item.slug === 'products' ? `/${item.slug}` : `/categories/${item.slug}`}
                            className="text-center text-[#737373] text-sm font-inter font-medium hover:text-gray-900 h-full"
                        >
                            {item.name}
                        </Link>
                    </MenuHandler>
                    {item?.categories.length > 0 &&
                        <MenuList
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="flex mt-4 py-12 left-0 right-0 justify-center flex-col outline-none border-none"
                        >
                            <div className="flex justify-center w-full">
                                <ul className={`grid grid-cols-${item.categories?.length > 6 ? '6' : item.categories.length} gap-8 list-none mb-0 ml-0 outline-none border-none`}>
                                    {item?.categories?.map((col, iCol) => {
                                        return (
                                            <li key={iCol}
                                                className="outline-none space-y-1"
                                            >
                                                <Link
                                                    href={`/categories/${item.slug}/${col.slug}`}
                                                    className="hover:underline font-inter text-[#737373] hover:text-gray-900 font-semibold text-xs uppercase"
                                                >
                                                    {col.name}
                                                </Link>
                                                <ul className="list-none mb-0 ml-0 space-y-1">
                                                    {col?.subcategories?.map((chilCol, iChildCol) => (
                                                        <li key={iChildCol}>
                                                            <Link
                                                                href={`/categories/${item.slug}/${col.slug}/${chilCol.slug}`}
                                                                className="hover:underline font-inter text-[#737373] hover:text-gray-900 text-xs uppercase"
                                                            >
                                                                {chilCol.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </MenuList>
                    }
                </Menu>
            ))}
        </div>
    )
}