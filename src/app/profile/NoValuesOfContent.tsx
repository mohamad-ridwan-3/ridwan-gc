import Iconify from "@/src/components/Iconify";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    icon?: string
    title: string,
    desc: string
}

export default function NoValuesOfContent({
    icon,
    title,
    desc
}: Props) {
    return (
        <div className="flex justify-center mt-8 flex-col items-center space-y-5">
            {icon &&
                <Iconify
                    icon={icon}
                    height={50}
                    width={50}
                    className="text-[#737373]"
                />
            }
            <TypographyClient
                title={title}
                props={{
                    children: <></>,
                    as: 'h1',
                    className: 'font-inter text-[#171717] font-semibold text-center max-w-[15rem]'
                }}
            />
            <TypographyClient
                title={desc}
                props={{
                    children: <></>,
                    className: 'font-inter text-[#737373] text-sm text-center'
                }}
            />
        </div>
    )
}