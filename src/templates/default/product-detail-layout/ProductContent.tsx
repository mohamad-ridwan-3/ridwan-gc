import { ProuductT } from "@/src/types/products"
import { Typography } from "@material-tailwind/react"
import { Dispatch, SetStateAction } from "react"
import Description from "./Description"

type VariationsT = {
    name: string
}

type PropsProductContent = {
    varations: VariationsT[]
    desc: string
    setSelectedVariant: Dispatch<SetStateAction<VariationsT>>
    selectedVariant: VariationsT
} & ProuductT

export default function ProductContent({
    varations,
    desc,
    name,
    price,
    // discount,
    // img,
    selectedVariant,
    setSelectedVariant
}: PropsProductContent) {
    return (
        <div className="px-4 screen-d-sm:px-0 screen-d-lg:col-span-2 mt-4">
            <Typography
                placeholder=""
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                variant="h2"
                className="text-center font-light font-avant-garde text-xs mt-12 screen-d-md:mt-0"
            >
                WAWA COSMETICS STORE
            </Typography>
            <Typography
                placeholder=""
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                variant="h2"
                className="text-center font-light font-avant-garde mt-4 px-0"
            >
                {name}
            </Typography>

            <div className="flex justify-center items-center">
                {/* <Typography
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="text-center font-light font-inter mt-4 line-through mr-2 tracking-widest text-lg mb-0"
                >
                    {discount}
                </Typography> */}
                <Typography
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="text-center font-light font-inter mt-4 text-[#FF0000] tracking-widest text-lg mb-0"
                >
                    {price}
                </Typography>
            </div>
            <div className="h-[1.5px] w-[50px] bg-black mx-auto my-[20px]">

            </div>
            <Typography
                placeholder=""
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                className="text-center font-light font-inter tracking-widest text-[0.8rem]"
            >
                VARIATIONS
            </Typography>

            <ul className="flex flex-wrap mt-4 gap-2 justify-center mb-6 list-none ml-0">
                {varations.map((item, i) => (
                    <li key={i}>
                        <button 
                        className={`border py-1.5 px-3 uppercase font-light font-inter text-[0.8rem] tracking-wider ${selectedVariant.name === item.name ? 'border-black' : ''}`}
                        onClick={()=>setSelectedVariant({name:item.name})}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>

            {/* <div className="hidden screen-d-sm:flex screen-d-sm:flex-col">
                <Button
                    variant="outlined"
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="uppercase rounded-none font-inter text-[0.8rem] w-full hover:opacity-1 font-normal tracking-wider"
                >
                    Add To Cart
                </Button>
                <Button
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="uppercase bg-black rounded-none font-inter text-[0.8rem] w-full font-normal tracking-wider mt-2"
                >
                    Buy Now
                </Button>
            </div> */}

            {/* btn mobile */}
            {/* <div className="flex fixed bottom-[-1px] bg-[#f1f1f1] left-0 right-0 screen-d-sm:hidden p-2">
                <Button
                    variant="outlined"
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="uppercase rounded-none font-inter text-[0.8rem] w-[50%] hover:opacity-1 font-normal tracking-wider bg-white border-none"
                >
                    Add To Cart
                </Button>
                <Button
                    placeholder=""
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    className="uppercase bg-black rounded-none font-inter text-[0.8rem] w-[50%] font-normal tracking-wider"
                >
                    Buy Now
                </Button>
            </div> */}

            <div className="mt-6 text-left text-sm font-apple-system tracking-wide">
                <Description desc={desc} />
            </div>
        </div>
    )
}