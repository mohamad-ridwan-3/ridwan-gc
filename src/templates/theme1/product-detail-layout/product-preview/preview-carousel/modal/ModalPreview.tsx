import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { ReactNode } from "react";

type Props = {
    open: boolean
    handler: () => void
    productName: string
    children: ReactNode
}

export default function ModalPreview({
    open,
    handler,
    productName,
    children
}: Props) {
    return (
        <Dialog
            open={open}
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            handler={handler}
            size="xxl"
            className="bg-[#171717]"
        >
            <div className="h-screen overflow-y-auto">
                <DialogHeader
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    placeholder=""
                    className="flex items-start pl-2 pr-4 space-x-2"
                >
                    <ButtonClient
                        props={{
                            children: <></>,
                            variant: 'text',
                            className: 'p-1',
                            onClick: handler
                        }}
                    >
                        <Iconify
                            icon="ep:back"
                            color="white"
                        />
                    </ButtonClient>
                    <p className="font-inter text-lg screen-tm1-sm:text-2xl text-white max-w-[25rem] text-start">
                        {productName}
                    </p>
                </DialogHeader>
                <DialogBody
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    placeholder=""
                    className="p-0 screen-tm1-sm:p-4"
                >
                    {children}
                </DialogBody>
                <DialogFooter
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    placeholder=""
                >
                    <ButtonClient
                        title="Close"
                        props={{
                            children: <></>,
                            onClick: handler,
                            className: 'text-white font-inter bg-gray-800'
                        }}
                    />
                </DialogFooter>
            </div>
        </Dialog>
    )
}