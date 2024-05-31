import { ChangeEvent, FormEvent } from "react"
import Iconify from "@/src/components/Iconify"
import { Input } from "@material-tailwind/react"

type Props = {
    submitSearch: (e: FormEvent<HTMLFormElement | HTMLButtonElement>)=>void
    handleSearch: (e: ChangeEvent<HTMLInputElement>)=>void
    searchValue: string
}

export default function Search({
    submitSearch,
    handleSearch,
    searchValue
}: Props) {
    return (
        <form
            onSubmit={submitSearch}
        >
            <Input
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
                type="text"
                placeholder="Search order number..."
                className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal w-[230px]"
                labelProps={{ className: 'hidden' }}
                onChange={handleSearch}
                value={searchValue}
                containerProps={{className: '!min-w-0'}}
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