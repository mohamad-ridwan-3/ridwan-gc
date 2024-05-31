'use client'

import Iconify from "@/src/components/Iconify";
import Container from "@/src/components/container";
import { CartsT } from "@/src/types/cart";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import Link from "next/link";
import TableRows from "./TableRows";
import TableHead from "./TableHead";

type PropsTableRows = {
    carts: CartsT[]
}

type Props = PropsTableRows

export default function DefaultCart({
    carts
}: Props) {
    return (
        <div className="mb-20 min-h-[65vh] min-container-h:min-h-screen">
            {/* <section className="flex mt-4">
                <div className="w-[960px] max-w-[960px] flex-col mx-auto overflow-x-auto overflow-y-hidden">
                    <div className="flex justify-center flex-col w-full items-center">
                        <h2 className="py-6 font-avant-garde font-medium text-2xl">
                            Cart
                        </h2>

                        <div className="w-[50px] h-[2px] bg-black flex mb-4"></div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <TableHead />
                            </thead>
                            <TableRows carts={carts} />
                            <tfoot>
                                <tr>
                                    <th colSpan={2} className="p-3">
                                        Total
                                    </th>
                                    <th className="p-3">
                                        MYR97.00
                                    </th>
                                    <th className="table-cell p-3"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section> */}
            {carts.length > 0 ? (
                <>
                    <div className="flex justify-center w-screen">
                        <div className="w-full max-w-7xl px-8">
                            <div className="flex justify-center flex-col w-full items-center">
                                <h2 className="py-6 font-avant-garde font-medium text-2xl">
                                    Cart
                                </h2>

                                <div className="w-[50px] h-[2px] bg-black flex mb-4"></div>
                            </div>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <TableHead />
                                    </thead>
                                    <TableRows carts={carts} />
                                    <tfoot>
                                        <tr>
                                            <th colSpan={2} className="p-3">
                                                Total
                                            </th>
                                            <th className="p-3">
                                                MYR97.00
                                            </th>
                                            <th className="table-cell p-3"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Container templateDir="default">
                        <div className="flex flex-col justify-between screen-d-sm:flex-col screen-d-md:flex-row w-full mt-4 gap-4">
                            <div className="flex flex-col">
                                <Textarea
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    rows={2}
                                    resize
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-sm h-[120px] screen-d-sm:min-w-[22rem] resize-y transition-none"
                                    value=""
                                    onChange={() => { }}
                                />

                                <Typography
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="text-[0.8rem] font-apple-system font-normal mt-2 text-center screen-d-sm:text-start"
                                >
                                    Order notes
                                </Typography>
                            </div>

                            <hr className="w-[50px] border-t-[1.5px] border-t-black flex screen-d-md:hidden mb-5 mx-auto" />

                            <div className="flex flex-wrap gap-3 screen-d-sm:gap-1">
                                <Button
                                    variant="outlined"
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="h-fit w-full screen-d-sm:w-fit font-apple-system rounded-sm font-normal text-[0.7rem] bg-[#E3E3E3] tracking-widest"
                                >
                                    Continue Shopping
                                </Button>
                                <Button
                                    variant="outlined"
                                    placeholder=""
                                    onPointerEnterCapture=""
                                    onPointerLeaveCapture=""
                                    className="h-fit w-full screen-d-sm:w-fit font-apple-system rounded-sm font-normal text-[0.7rem] bg-[#E3E3E3] tracking-widest"
                                >
                                    Update
                                </Button>
                                <Link href={'/checkout/ad9w981y1d1d'}>
                                    <Button
                                        placeholder=""
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                        className="h-fit w-full screen-d-sm:w-fit font-apple-system rounded-sm font-normal text-[0.7rem] tracking-widest flex items-center justify-center"
                                    >
                                        Checkout

                                        <Iconify
                                            icon="ph:arrow-right-light"
                                            width={13}
                                            height={13}
                                            className="text-white ml-1 mt-0.3"
                                        />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </>
            ) : (
                <div className="flex flex-col items-center min-h-[30rem] justify-center">
                    <Typography
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        className="font-avant-garde text-[1.9rem]"
                    >
                        Your cart is empty
                    </Typography>

                    <Link
                        href={'/'}
                        className="items-center flex"
                    >
                        <Iconify
                            icon="prime:angle-left"
                            width={18}
                        />
                        <Typography
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="font-avant-garde text-xs mt-3.5"
                        >
                            Back to home
                        </Typography>
                    </Link>
                </div>
            )}
        </div>
    )
}