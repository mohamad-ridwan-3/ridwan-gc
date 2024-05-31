import { staticImages } from "@/src/utils";
import Image from "next/image";
import TypographyClient from "../client/typography/TypographyClienct";

type Props = {
    title?: string
}

export default function HeaderContent({
    title = `sorry, we can${`'`}t find the page you${`'`}re looking for`
}: Props) {
    return (
        <div
            className="flex flex-col w-full items-center p-8 gap-2"
        >
            <Image
                src={`${staticImages}/emot/face.png`}
                alt="face"
                height={500}
                width={500}
                className="max-w-full max-h-full object-contain"
                style={{
                    width: '60px'
                }}
            />
            <TypographyClient
                props={{
                    variant: "h1",
                    className: "font-inter text-[#737373] text-center text-3xl",
                    children: <></>
                }}
            >
                {title}
            </TypographyClient>
        </div>
    )
}