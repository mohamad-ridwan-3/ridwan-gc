import { useEffect, useState } from "react";
import Iconify from "@/src/components/Iconify";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { session_login_name, staticImages } from "@/src/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import Cookies from 'js-cookie'
import { addCart } from "@/src/store/cart/cartSlice";
import { DataListCartT } from "@/src/types/cart";
import { ProfileMenuItemsT } from "@/src/types/navbar";
import logout from "@/src/lib/server-actions/auth/logout";
import toast from "react-hot-toast";

type Props = {
    user: any
    isProfileMenuOpen: boolean
    handleProfileMenu: () => void
}

export default function Profile({
    user,
    isProfileMenuOpen,
    handleProfileMenu,
}: Props) {
    const [currentUser, setCurrentUser] = useState(user)
    const [profileMenuItems, setProfileMenuItems] = useState<ProfileMenuItemsT[]>([])
    const [loadingLogout, setLoadingLogout] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const userStore = useAppSelector((state) => state.user) as any
    const router = useRouter()
    const pathname = usePathname()

    const cookie = Cookies.get(session_login_name)

    useEffect(() => {
        if (cookie) {
            setProfileMenuItems([
                {
                    label: "My Account",
                    icon: 'lets-icons:user-duotone',
                    name: 'profile',
                    slug: '/profile'
                },
                {
                    label: "My Orders",
                    icon: 'lets-icons:order-duotone',
                    name: 'my-orders',
                    slug: '/profile/orders-history'
                },
                {
                    label: "Sign Out",
                    icon: 'lets-icons:sign-out-circle-duotone',
                    name: 'sign-out'
                },
            ])
        } else {
            setProfileMenuItems([
                {
                    label: "My Account",
                    icon: 'lets-icons:user-duotone',
                    name: 'profile',
                    slug: '/login'
                },
                {
                    label: "Sign in",
                    icon: 'solar:login-bold-duotone',
                    name: 'sign-in',
                    slug: '/login'
                },
                {
                    label: "Register",
                    icon: 'lets-icons:user-add-alt-duotone',
                    name: 'register',
                    slug: '/registration'
                },
            ])
        }
    }, [pathname, cookie])

    useEffect(() => {
        if (userStore?.user?.data) {
            setCurrentUser(userStore.user)
        }
    }, [userStore])

    const closeMenu = async (name: string, slug?: string) => {
        handleProfileMenu()
        if (name === 'sign-out') {
            setLoadingLogout(true)
            const result = await logout()
            if (result?.result) {
                Cookies.remove(session_login_name)
                router.push('/login')
                setTimeout(() => {
                    dispatch(addCart({} as DataListCartT))
                    setLoadingLogout(false)
                }, 1000);
            }else if(result?.message === 'no-cookie'){
                router.push('/login')
            }else if(result.message.includes('Unauthenticated')){
                Cookies.remove(session_login_name)
                router.push('/login')
                setTimeout(() => {
                    dispatch(addCart({} as DataListCartT))
                    setLoadingLogout(false)
                }, 1000);
            }else if(!result?.result) {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoadingLogout(false)
            }
        } else if (slug) {
            router.push(slug)
        }
    };

    return (
        <>
            <Menu open={isProfileMenuOpen} handler={handleProfileMenu} placement="bottom-end">
                <MenuHandler>
                    <Button
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        variant="text"
                        className="rounded-full p-0.3"
                    >
                        <Avatar
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            src={
                                !currentUser?.data?.fotoProfil ?
                                    `${staticImages}/avatars/avatar.png` :
                                    currentUser?.data?.fotoProfil
                            }
                        />
                    </Button>
                </MenuHandler>
                <MenuList
                    className="p-1 mt-2"
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                >
                    {profileMenuItems.map(({ label, icon, name, slug }, key) => {
                        const isLastItem = name === 'sign-out';
                        return (
                            <MenuItem
                                key={label}
                                placeholder=""
                                onPointerEnterCapture=""
                                onPointerLeaveCapture=""
                                onClick={() => {
                                    closeMenu(name, slug)
                                }}
                                className={`flex items-center gap-2 rounded font-inter text-[#171717] ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                    }`}
                                disabled={name === 'sign-out' && loadingLogout}
                            >
                                <Iconify
                                    icon={icon}
                                />
                                <Typography
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </>
    )
}