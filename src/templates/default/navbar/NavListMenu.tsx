import { Accordion, AccordionBody } from "@material-tailwind/react"
import { ReactNode } from "react"

type PropsNavList = {
    isMenuOpen: number | null
    children: ReactNode
    index: number
}

export default function NavListMenu({
    isMenuOpen,
    children,
    index
}: PropsNavList) {
    return (
        <Accordion
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            open={index === isMenuOpen}
        >
            <AccordionBody>
                {children}
            </AccordionBody>
        </Accordion>
    )
}