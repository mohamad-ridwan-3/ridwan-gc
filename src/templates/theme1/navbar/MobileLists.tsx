import { Typography } from "@material-tailwind/react"
import SearchNavbar from "./Search"
import Link from "next/link"
import Iconify from "@/src/components/Iconify"
import NavListMenuMobile from "./NavListMenuMobile"
import { ChangeEvent, FormEvent } from "react"
import { DataCollectionsT } from "@/src/types/navbar"

type Props = {
    searchValue: string
    submitSearch: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void
    changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
    listMenu: DataCollectionsT[]
    closeNavbar: () => void
    clickAccordion: (index: number) => void
    isMobileOpen: number | null
    isMenuChildOpen: number | null
    clickChildAccordion: (index: number)=>void
}

export default function MobileLists({
    searchValue,
    submitSearch,
    changeSearch,
    listMenu,
    closeNavbar,
    clickAccordion,
    isMobileOpen,
    isMenuChildOpen,
    clickChildAccordion
}: Props) {
    return (
        <div className="w-full pb-16 flex">
            <div className="flex max-h-[768px] overflow-y-auto w-full">
                <div className="flex w-full">
                    <div className="w-full mt-2">
                        <SearchNavbar
                            searchValue={searchValue}
                            submitSearch={submitSearch}
                            changeSearch={changeSearch}
                            className="px-4 pb-2"
                        />
                        <ul className="w-full flex flex-col px-4 mb-0 ml-0 list-none">
                            {listMenu.map((item, i) => {
                                return <li key={i} className="flex py-4 border-t">
                                    <div className="w-full flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <Link
                                                href={item.slug === 'products' ? `/${item.slug}` : `/categories/${item.slug}`}
                                                onClick={closeNavbar}
                                            >
                                                <Typography
                                                    placeholder=""
                                                    onPointerEnterCapture=""
                                                    onPointerLeaveCapture=""
                                                    className="text-sm font-inter font-medium mb-0 text-[#737373]"
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Link>
                                            {item?.categories.length > 0 &&
                                                <button
                                                    onClick={() => clickAccordion(i)}
                                                    className="w-20 flex justify-end"
                                                >
                                                    <Iconify
                                                        icon={isMobileOpen === i ? 'prime:angle-up' : 'prime:angle-down'}
                                                        className="text-[#737373]"
                                                    />
                                                </button>
                                            }
                                        </div>

                                        {item?.categories.length > 0 &&
                                            <NavListMenuMobile
                                                isMenuOpen={isMobileOpen}
                                                index={i}
                                            >
                                                <ul className="flex flex-col ml-6 mb-0 list-none">
                                                    {item.categories.map((col, iCol) => (
                                                        <li key={iCol} className="list-none space-y-1 text-start border-b py-2 w-full flex flex-col">
                                                            <div className="flex justify-between items-center">
                                                                <Link
                                                                    href={`/categories/${item.slug}/${col.slug}`}
                                                                    className="font-inter font-medium hover:text-gray-900 w-full"
                                                                    onClick={closeNavbar}
                                                                >
                                                                    {col.name}
                                                                </Link>
                                                                <button
                                                                    onClick={() => clickChildAccordion(iCol)}
                                                                    className="w-20 flex justify-end"
                                                                >
                                                                    <Iconify
                                                                        icon={isMenuChildOpen === iCol ? 'prime:angle-up' : 'prime:angle-down'}
                                                                        className="text-[#737373]"
                                                                    />
                                                                </button>
                                                            </div>
                                                            <NavListMenuMobile
                                                                index={iCol}
                                                                isMenuOpen={isMenuChildOpen}
                                                                className="py-0"
                                                            >
                                                                <ul className="list-none mb-0 ml-0 space-y-1">
                                                                    {col?.subcategories?.map((chilCol, iChildCol) => (
                                                                        <li key={iChildCol} className="text-start flex flex-col w-full">
                                                                            <Link
                                                                                href={`/categories/${item.slug}/${col.slug}/${chilCol.slug}`}
                                                                                className="hover:underline font-normal font-inter text-[#737373] text-xs uppercase text-start hover:text-gray-900 w-full"
                                                                                onClick={closeNavbar}
                                                                            >
                                                                                {chilCol.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </NavListMenuMobile>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavListMenuMobile>
                                        }
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}