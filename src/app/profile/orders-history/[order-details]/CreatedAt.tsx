import Iconify from "@/src/components/Iconify";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import dayjs from "dayjs";

type Props = {
    created_at: string
}

export default function CreatedAt({
    created_at
}: Props) {
    const localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)

    return (
        <div className="flex my-4 items-center space-x-2">
            <Iconify
                icon="material-symbols:date-range"
                height={20}
                width={20}
                className="text-[#c2890e]"
            />
            <TypographyClient
                props={{
                    children: <></>,
                    className: 'font-inter text-sm text-[#171717] font-normal'
                }}
            >
                {dayjs(created_at).format('LLLL')}
            </TypographyClient>
        </div>
    )
}