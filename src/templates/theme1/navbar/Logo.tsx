import { mainDomain, staticImages } from "@/src/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

type MenuBtnT = {
    handleOpen: () => void
}

export default function Logo({
    handleOpen
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
            className="mr-8"
            onClick={() => {
                handleOpen()
                // window.location.href = '/store'
                goHome()
            }}
        >
            <Image
                src={`${staticImages}/gangco.png`}
                className="max-w-[100px]"
                alt="storefront"
                height={100}
                width={100}
                fetchPriority="high"
                decoding="sync"
                loading="eager"
            />
        </button>
    )
}