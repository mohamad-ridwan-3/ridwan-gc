import Iconify from "@/src/components/Iconify"
import { Typography } from "@material-tailwind/react"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

type MenuBtnT = {
    handleOpen?: () => void
    setOpen?: Dispatch<SetStateAction<boolean>>
    closeNavbar?: () => void
}

export default function Cart({
    closeNavbar
}: MenuBtnT) {
    return (
        <div className="relative">
            <Link
                href="/cart"
                onClick={closeNavbar}
                scroll={false}
            >
                <Iconify
                    icon="uil:cart"
                />
            </Link>

            <div className="rounded-full flex justify-center items-center h-[1.25rem] w-[1.25rem] bg-black absolute right-[-7px] top-0">
                <Typography
                    className="text-white text-[0.6rem] mb-0"
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                >2</Typography>
            </div>
        </div>
    )
}