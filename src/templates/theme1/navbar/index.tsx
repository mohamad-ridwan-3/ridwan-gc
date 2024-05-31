'use client'

import { DataCollectionsT } from "@/src/types/navbar"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import NavListMenu from "./NavListMenu"
import Logo from "./Logo"
import Cart from "./Cart"
import SearchNavbar from "./Search"
import Profile from "./Profile"
import MobileLists from "./MobileLists"
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import Iconify from "@/src/components/Iconify"
import { useAppDispatch } from "@/src/hooks/redux"
import { addFirstLoadSearchPage } from "@/src/store/search/searchSlice"

type PropsPageMenu = {
    user: any
    listMenu: DataCollectionsT[]
}

export default function NavbarTheme1({
    user,
    listMenu
}: PropsPageMenu
) {
    const [searchValue, setSearchValue] = useState<string>('')
    const [isMobileOpen, setIsMobileOpen] = useState<number | null>(null)
    const [isMenuChildOpen, setIsMenuChildOpen] = useState<number | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    // profile
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()

    function handleOpen(): void {
        setOpen(!open)
        setIsMenuChildOpen(null)
        setIsMobileOpen(null)
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [open])

    function clickAccordion(index: number): void {
        setIsMenuChildOpen(null)
        if (isMobileOpen === index) {
            setIsMobileOpen(null)
            return
        }
        setIsMobileOpen(index)
    }

    function closeNavbar(): void {
        setIsMobileOpen(null)
        setIsMenuChildOpen(null)
        setOpen(false)
    }

    function submitSearch(e: FormEvent<HTMLFormElement | HTMLButtonElement>): void {
        if (searchValue.trim()) {
            if(pathname === '/search/product'){
                dispatch(addFirstLoadSearchPage(false))
            }
            router.push(`/search/product?query=${searchValue}`)
            closeNavbar()
        }
        e.preventDefault()
    }

    function changeSearch(e: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value)
    }

    function handleProfileMenu(): void {
        setIsProfileMenuOpen(!isProfileMenuOpen)
        if (open) {
            setOpen(!open)
        }
        if (isMobileOpen !== null) {
            setIsMobileOpen(null)
        }
    }

    function clickChildAccordion(index: number):void{
        if (isMenuChildOpen === index) {
            setIsMenuChildOpen(null)
            return
        }
        setIsMenuChildOpen(index)
    }

    return (
        <>
            <div className={`sticky top-0 left-0 right-0 z-[9999] flex justify-center w-screen bg-[hsla(0,0%,96%,.5)] backdrop-blur-md`}>
                <div className="w-[80rem] max-w-7xl px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Logo
                                handleOpen={closeNavbar}
                            />
                            <NavListMenu
                                listMenu={listMenu}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <SearchNavbar
                                searchValue={searchValue}
                                submitSearch={submitSearch}
                                changeSearch={changeSearch}
                                className="screen-tm1-lg:w-80 hidden screen-tm1-lg:flex"
                            />
                            <Cart
                                handleOpen={closeNavbar}
                            />
                            <Profile
                                user={user}
                                isProfileMenuOpen={isProfileMenuOpen}
                                handleProfileMenu={handleProfileMenu}
                            />
                            <div className="screen-d-md:hidden flex">
                                <Menu open={open} handler={handleOpen} placement="bottom-end">
                                    <MenuHandler>
                                        <button>
                                            <Iconify
                                                icon={!open ? "heroicons-outline:menu" : 'iconamoon:close-light'}
                                            />
                                        </button>
                                    </MenuHandler>
                                    <MenuList
                                        className="mt-3.5 h-screen w-full flex bg-white z-[9999999] screen-d-md:hidden rounded-none border-none"
                                        placeholder=""
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                    >
                                        <MobileLists
                                            searchValue={searchValue}
                                            submitSearch={submitSearch}
                                            changeSearch={changeSearch}
                                            listMenu={listMenu}
                                            closeNavbar={closeNavbar}
                                            clickAccordion={clickAccordion}
                                            isMobileOpen={isMobileOpen}
                                            isMenuChildOpen={isMenuChildOpen}
                                            clickChildAccordion={clickChildAccordion}
                                        />
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}