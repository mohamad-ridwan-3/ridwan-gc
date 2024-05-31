import Iconify from "@/src/components/Iconify"
import { Input } from "@material-tailwind/react"
import { ChangeEvent, FormEvent } from "react"

type Props = {
    submitSearch: (e: FormEvent<HTMLFormElement | HTMLButtonElement>)=>void
    className: string
    changeSearch: (e: ChangeEvent<HTMLInputElement>)=>void
    searchValue: string
}

export default function SearchNavbar({
    submitSearch,
    className,
    changeSearch,
    searchValue
}: Props) {
    return (
        <form
            onSubmit={submitSearch}
            className={className}
        >
            <Input
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
                type="text"
                placeholder="Search for products..."
                className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal"
                labelProps={{ className: 'hidden' }}
                onChange={changeSearch}
                value={searchValue}
                tabIndex={-1}
                icon={
                    <button
                        onSubmit={submitSearch}
                        type="submit"
                        disabled={!searchValue.trim()}
                    >
                        <span className="sr-only">search</span>
                        <Iconify
                            icon="iconamoon:search"
                            height={20}
                            width={20}
                            className={`${searchValue.trim() ? 'hover:text-[#000] cursor-pointer' : 'cursor-default'} text-[#737373] transition-all`}
                        />
                    </button>
                }
            />
        </form>
    )
}