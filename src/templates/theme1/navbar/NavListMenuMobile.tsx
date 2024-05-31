import { Accordion, AccordionBody } from "@material-tailwind/react"
import { ReactNode } from "react"

type PropsNavListMobile = {
    isMenuOpen: number | null
    children: ReactNode
    index: number
    className?: string
}

export default function NavListMenuMobile({
    isMenuOpen,
    index,
    children,
    className
}: PropsNavListMobile) {
    return (
        <Accordion
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            open={index === isMenuOpen}
        >
            <AccordionBody className={className}>
                {children}
            </AccordionBody>
        </Accordion>
    )
}