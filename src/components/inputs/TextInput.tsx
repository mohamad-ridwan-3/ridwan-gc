import Iconify from "../Iconify";
import { ChangeEvent, ClipboardEvent, FocusEvent, ReactNode } from "react";
import InputClient from "@/src/lib/client/inputs/InputClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    title?: string
    isRequired?: boolean
    placeholder?: string
    classInput?: string
    type?: string
    txtDesc?: string
    classTxtDesc?: string
    isDisabledIcon?: boolean
    icon?: string
    clickIcon?: () => void
    groupIcons?: ReactNode
    classIcon?: string
    id?: string
    name?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
    onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void
    isStarSign?: boolean
    containerProps?: string
    isDisabledInput?: boolean
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export default function TextInput({
    title,
    placeholder,
    classInput,
    isRequired,
    type,
    txtDesc,
    classTxtDesc = 'text-sm',
    isDisabledIcon,
    icon,
    clickIcon,
    groupIcons,
    classIcon = 'text-black',
    id,
    name,
    onChange,
    value,
    onPaste,
    isStarSign = true,
    containerProps,
    isDisabledInput,
    onBlur
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

            <InputClient
                props={{
                    id: id,
                    name: name,
                    type: type,
                    placeholder: placeholder,
                    required: isRequired,
                    className: `!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal ${classInput}`
                    ,
                    labelProps: { className: 'hidden' },
                    onChange: onChange,
                    value: value,
                    onPaste: onPaste,
                    containerProps: { className: containerProps },
                    disabled: isDisabledInput,
                    onBlur: onBlur,
                    icon: icon ? (
                        <button
                            disabled={isDisabledIcon}
                            onClick={clickIcon}
                            type="button"
                        >
                            <Iconify
                                icon={icon}
                                height={23}
                                width={23}
                                className={classIcon}
                            />
                        </button>
                    ) : undefined
                }}
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