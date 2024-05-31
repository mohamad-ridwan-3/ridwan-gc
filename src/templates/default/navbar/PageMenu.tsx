import { ListMenuT } from "@/src/types/navbar"
import { mainDomain } from "@/src/utils"
import { Accordion, AccordionBody } from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import NavListMenu from "./NavListMenu"

type PropsPageMenu = {
    open: boolean
    listMenu: ListMenuT[]
    handleOpen: () => void
    closeNavbar?: () => void
    isMenuOpen?: number | null
    setIsMenuOpen?: Dispatch<SetStateAction<number | null>>
}

export default function PageMenu({
    open,
    listMenu,
    handleOpen,
    setIsMenuOpen,
    isMenuOpen,
    closeNavbar
}: PropsPageMenu) {
    const router = useRouter()
    function goHome(): void {
        if (window.location.hostname.includes(mainDomain)) {
            window.location.replace('/store')
        } else {
            window.location.replace('/')
        }
    }
    return (
        <Accordion
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            open={open}
        >
            <AccordionBody>
                <ul className="w-full py-2 flex flex-col justify-center border ml-0 mb-0">
                    {listMenu.map((item, i) => {
                        return <li key={i} className="flex justify-center" onClick={handleOpen}>
                            {item.path === '/' ?
                                (
                                    <button
                                        className="text-center uppercase tracking-widest text-black text-[16px] py-2 font-apple-system font-semibold hover:text-gray-800 transition-all w-full"
                                        onClick={goHome}
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <div
                                        className="text-center uppercase tracking-widest text-black text-[16px] font-apple-system font-semibold hover:text-gray-800 transition-all w-full py-2"
                                        onMouseOver={() => {
                                            if (setIsMenuOpen) {
                                                setIsMenuOpen(i)
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (setIsMenuOpen) {
                                                setIsMenuOpen(null)
                                            }
                                        }}
                                    >
                                        <Link
                                            href={item.path}
                                            className="text-center uppercase tracking-widest text-black text-[16px] font-apple-system font-semibold hover:text-gray-800 transition-all w-full"
                                            onClick={closeNavbar}
                                        >
                                            {item.name}
                                        </Link>
                                        {item?.collection &&
                                            <NavListMenu
                                                isMenuOpen={isMenuOpen as number}
                                                index={i}
                                            >
                                                <div
                                                    className="flex mx-4 justify-center border-b pb-4"
                                                >
                                                    <ul className={`grid grid-cols-${item.collection.length > 6 ? '6' : item.collection.length} gap-2 list-none mb-0 ml-0`}>
                                                        {item?.collection?.map((col, iCol) => (
                                                            <li key={iCol}
                                                                className="outline-none space-y-1 text-start"
                                                            >
                                                                <Link
                                                                    href={col.path}
                                                                    onClick={closeNavbar}
                                                                    className="hover:underline font-apple-system text-black font-bold text-xs uppercase text-start"
                                                                >
                                                                    {col.name}
                                                                </Link>
                                                                <ul className="list-none mb-0 ml-0 space-y-1">
                                                                    {col?.collection?.map((chilCol, iChildCol) => (
                                                                        <li key={iChildCol} className="text-start">
                                                                            <Link
                                                                                href={chilCol.path}
                                                                                onClick={closeNavbar}
                                                                                className="hover:underline font-normal font-apple-system text-black text-xs uppercase text-start"
                                                                            >
                                                                                {chilCol.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </NavListMenu>
                                        }
                                    </div>
                                )
                            }
                        </li>
                    })}
                </ul>
            </AccordionBody>
        </Accordion >
    )
}