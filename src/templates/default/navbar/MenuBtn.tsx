import Iconify from "@/src/components/Iconify"
import { Dispatch, SetStateAction } from "react"

type MenuBtnT = {
    handleOpen?: () => void
    setOpen?: Dispatch<SetStateAction<boolean>>
    closeNavbar?: () => void
}

export default function MenuBtn({
    handleOpen
}: MenuBtnT) {
    return (
        <Iconify
            icon="heroicons-outline:menu"
            click={handleOpen}
        />
    )
}