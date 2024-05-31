import { mainDomain, staticImages } from "@/src/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

type MenuBtnT = {
    handleOpen?: () => void
    setOpen?: Dispatch<SetStateAction<boolean>>
    closeNavbar?: () => void
}

export default function Logo({
    closeNavbar
}: MenuBtnT) {
    const router = useRouter()
    function goHome(): void {
        if (window.location.hostname.includes(mainDomain)) {
            window.location.replace('/store')
        } else {
            window.location.replace('/')
        }
    }
    return (
        <button
            // href={"/"}
            onClick={() => {
                if (closeNavbar) {
                    closeNavbar()
                }
                goHome()
                // window.location.href = '/'
            }}
        >
            <Image
                src={`${staticImages}/gangco.png`}
                className="max-w-[200px]"
                alt="storefront"
                height={200}
                width={200}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
            />
        </button>
    )
}