import Iconify from "@/src/components/Iconify"
import { useAppSelector } from "@/src/hooks/redux"
import { Typography } from "@material-tailwind/react"
import Link from "next/link"

type MenuBtnT = {
    handleOpen: () => void
}

export default function Cart({
    handleOpen
}: MenuBtnT) {
    const cart = useAppSelector((state) => state.cart)
    return (
        <div className="relative pr-4">
            <Link
                href="/cart"
                onClick={handleOpen}
            >
                <Iconify
                    icon="uil:cart"
                />
            </Link>

            <Link
                href="/cart"
                onClick={handleOpen}
            >
                {cart?.cart?.carts?.length > 0 &&
                    <div className="rounded-[3px] flex justify-center items-center px-[5px] py-[0.3px] bg-black absolute right-[9px] bottom-[-8px]">
                        <Typography
                            className="text-white text-[0.7rem] mb-0 font-bold font-inter"
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                        >
                            {cart.cart.carts.length}
                        </Typography>
                    </div>
                }
            </Link>
        </div>
    )
}