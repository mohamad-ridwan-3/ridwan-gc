import Iconify from "@/src/components/Iconify";

type MenuBtnT = {
    handleOpen: () => void
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