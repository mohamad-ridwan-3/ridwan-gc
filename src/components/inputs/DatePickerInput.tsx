import DatePickerClient from "@/src/lib/client/inputs/DatePickerClient"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import { DateValueType } from "react-tailwindcss-datepicker"

type Props = {
    title?: string
    isRequired?: boolean
    isStarSign?: boolean
    txtDesc?: string
    classTxtDesc?: string
    value: DateValueType
    handleValueChange: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void
    useRange?: boolean
    asSingle?: boolean
    inputClassName?: string
}

export default function DatePickerInput({
    title,
    isRequired,
    isStarSign = true,
    txtDesc,
    classTxtDesc = 'text-sm',
    value,
    handleValueChange,
    useRange,
    asSingle,
    inputClassName = 'peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal'
}: Props) {
    return (
        <div>
            {title &&
                <TypographyClient
                    props={{
                        className: 'text-xs font-inter mb-1',
                        children: <></>
                    }}
                >
                    {title}{isRequired && isStarSign ? '*' : ''}
                </TypographyClient>
            }
            <DatePickerClient
                value={value}
                handleValueChange={handleValueChange}
                useRange={useRange}
                asSingle={asSingle}
                inputClassName={inputClassName}
            />
            {txtDesc &&
                <TypographyClient
                    props={{
                        className: `font-inter mt-1 font-normal ${classTxtDesc}`,
                        children: <></>
                    }}
                >
                    {txtDesc}
                </TypographyClient>
            }
        </div>
    )
}