import { ChangeEvent } from "react";
import Iconify from "@/src/components/Iconify";
import TextInput from "@/src/components/inputs/TextInput";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

type Props = {
    stock: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    clickMinus: () => void
    clickPlus: () => void
    errMessage?: string
    isDisabledBtnMinus?: boolean
    isDisabledBtnPlus?: boolean
}

export default function InputQuantity({
    stock,
    onChange,
    value,
    clickMinus,
    clickPlus,
    errMessage,
    isDisabledBtnMinus,
    isDisabledBtnPlus
}: Props) {
    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-1 flex-wrap justify-end screen-tm1-lg:justify-start">
                <div className="relative items-center w-fit">
                    <ButtonClient
                        props={{
                            variant: 'text',
                            children: <></>,
                            size: 'sm',
                            className: '!absolute left-1 p-0 z-10 mt-[0.4rem] w-fit',
                            onClick: clickMinus,
                            disabled: isDisabledBtnMinus,
                        }}
                    >
                        <Iconify
                            icon="clarity:minus-line"
                        />
                    </ButtonClient>
                    <TextInput
                        type="tel"
                        classInput="!w-[6.5rem] text-center !px-[2rem]"
                        containerProps="!min-w-0"
                        onChange={onChange}
                        value={value}
                    />
                    <ButtonClient
                        props={{
                            variant: 'text',
                            children: <></>,
                            size: 'sm',
                            className: '!absolute p-0 z-10 top-0 right-1 mt-[0.4rem] w-fit',
                            onClick: clickPlus,
                            disabled: isDisabledBtnPlus
                        }}
                    >
                        <Iconify
                            icon="basil:plus-solid"
                        />
                    </ButtonClient>
                </div>
                <div
                    className="space-x-1 flex items-center"
                >
                    <TypographyClient
                        title="Stock:"
                        props={{
                            children: <></>,
                            className: 'font-inter text-sm font-normal'
                        }}
                    />
                    <TypographyClient
                        title={stock == '1' ? `Sisa ${stock}` : stock == '0' ? 'Sold' : stock}
                        props={{
                            children: <></>,
                            className: `font-inter text-sm font-semibold ${stock == '1' ? 'text-orange-900' : stock == '0' ? 'text-red-600' : ''}`
                        }}
                    />
                </div>
            </div>
            {errMessage &&
                <TypographyClient
                    title={errMessage}
                    props={{
                        children: <></>,
                        className: 'text-xs font-inter text-red-600 font-normal text-end screen-tm1-lg:text-start'
                    }}
                />
            }
        </div>
    )
}