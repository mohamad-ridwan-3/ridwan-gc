'use client'

import { CountriesT } from "@/src/types/checkout";
import { Option, Select, Typography } from "@material-tailwind/react";

type Props = {
    options: CountriesT[]
    value?: string
    placeholder?: string
    title?: string
    isRequired?: boolean
    classSelect?: string
}

export default function SelectInput({
    options,
    value,
    placeholder,
    title,
    isRequired,
    classSelect
}: Props) {
    return (
        <div>
            {title &&
                <Typography
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    placeholder=""
                    className="text-xs font-inter mb-1"
                >
                    {title}{isRequired ? '*' : ''}
                </Typography>
            }

            <Select
                placeholder={placeholder}
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                // label="Select Currency"
                className={`!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal ${classSelect}`}
                labelProps={{ className: 'hidden' }}
                value={value}
            >
                {options.map((item, i) => (
                    <Option key={i} className="list-none">{item.name}</Option>
                ))}
            </Select>
        </div>
    )
}