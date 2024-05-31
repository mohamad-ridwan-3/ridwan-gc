import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import Link from "next/link";

type Props = {
    href?: string
    btnName?: string
    title: string
    desc: string
}

export default function TitleWithNavigation({
    href,
    btnName,
    title,
    desc
}: Props) {
    return (
        <div className="flex items-center w-full justify-center mt-8">
            <div className="w-full screen-tm1-sm:w-[30rem] flex border-b border-gray-200 py-3 px-8 justify-between items-center flex-wrap">
                <div>
                    <TypographyClient
                        title={title}
                        props={{
                            children: <></>,
                            className: 'font-inter text-[#171717] font-semibold'
                        }}
                    />
                    <TypographyClient
                        title={desc}
                        props={{
                            children: <></>,
                            className: 'font-inter text-xs text-[#737373]'
                        }}
                    />
                </div>
                {href &&
                    <Link href={href} className="w-full screen-tm1-sm:w-fit">
                        <ButtonClient
                            title={btnName}
                            props={{
                                size: 'sm',
                                children: <></>,
                                className: 'font-inter !shadow-none w-full mt-4 screen-tm1-sm:w-fit screen-tm1-sm:mt-0'
                            }}
                        />
                    </Link>
                }
            </div>
        </div>
    )
}