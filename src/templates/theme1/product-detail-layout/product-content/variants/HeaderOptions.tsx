import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    title: string
    value?: string
}

export default function HeaderOptions({
    title,
    value
}: Props) {
    return (
        <div className="flex flex-wrap items-center my-4">
            <TypographyClient
                title={title}
                props={{
                    children: <></>,
                    as: 'h1',
                    className: 'font-inter text-sm text-[#171717] font-semibold mr-1'
                }}
            />
            {value &&
                <TypographyClient
                    title={value}
                    props={{
                        children: <></>,
                        as: 'h1',
                        className: 'font-inter text-sm text-[#737373] font-normal'
                    }}
                />
            }
        </div>
    )
}