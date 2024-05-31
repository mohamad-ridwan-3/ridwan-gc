'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { ListMenuT } from "@/src/types/navbar"
import MenuBtn from "./MenuBtn"
import Logo from "./Logo"
import Cart from "./Cart"
import PageMenu from "./PageMenu"
import { TemplateDirT } from "@/src/types/template"

type MenuBtnT = {
    closeNavbar?: () => void
}

type PropsPageMenu = {
    listMenu: ListMenuT[]
    closeNavbar?: () => void
    isMenuOpen?: number | null
    setIsMenuOpen?: Dispatch<SetStateAction<number | null>>
}

export default function NavbarDefault({
    listMenu,
    templateDir
}: PropsPageMenu & MenuBtnT & TemplateDirT) {
    const [open, setOpen] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null)

    function handleOpen(): void {
        setOpen(!open)
    }

    function closeNavbar(): void {
        if (typeof setOpen !== 'undefined') {
            setIsMenuOpen(null)
            setOpen(false)
        }
    }
    return (
        <div className="flex justify-center w-screen">
            <div className={`w-[80rem] max-w-7xl px-8`}>
                <div className="flex justify-between items-center py-[1.5rem]">
                    <MenuBtn handleOpen={handleOpen} />

                    <Logo
                        closeNavbar={closeNavbar}
                    />

                    <Cart closeNavbar={closeNavbar} />
                </div>

                <PageMenu
                    open={open}
                    listMenu={listMenu}
                    handleOpen={handleOpen}
                    closeNavbar={closeNavbar}
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />
            </div>
        </div>
    )
}