'use client'

import { Button } from "@material-tailwind/react";

export default function AddToCart() {
    return (
        <div className="mt-4">
            <div className="flex flex-col screen-d-md:sticky top-[40px]">
                <div className="hidden screen-d-md:flex screen-d-sm:flex-col">
                    <Button
                        variant="outlined"
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        className="uppercase rounded-none font-inter text-[0.8rem] w-full hover:opacity-1 font-normal tracking-wider bg-white"
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
                </div>

                {/* btn mobile */}
                <div className="flex fixed bottom-[-1px] bg-[#f1f1f1] left-0 right-0 screen-d-md:hidden p-2">
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
                </div>
            </div>
        </div>
    )
}