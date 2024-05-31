import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    title?: string
    desc: string
}

export default function HeaderContent({
    title,
    desc,
}: Props) {
    return (
        <div className="flex justify-center items-center flex-col w-full">
            <div className="flex flex-col max-w-[45rem] space-y-6">
                {title &&
                    <TypographyClient
                        title={title}
                        props={{
                            children: <></>,
                            as: 'h1',
                            className: 'font-inter font-bold text-3xl text-center'
                        }}
                    />
                }
                <TypographyClient
                    title={desc}
                    props={{
                        children: <></>,
                        className: 'font-inter font-normal text-sm text-center text-[#737373]'
                    }}
                />
            </div>
        </div>
    )
}