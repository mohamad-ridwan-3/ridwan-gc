'use client'

import SelectClient from "@/src/lib/client/selects/SelectClient"
import ThemeProviderClient from "@/src/lib/client/theme/ThemeProviderClient"

type CurrencyT = {
    name: string
    value: string
}

type PropsCurrency = {
    currencys: CurrencyT[]
}

export default function SelectCurrency({
    currencys
}: PropsCurrency) {
    const customTheme = {
        select: {
            styles: {
                base: {
                    container: {
                        minWidth: 'min-w-[90px]'
                    }
                }
            }
        }
    }

    return (
        <div className="">
            <ThemeProviderClient value={customTheme}>
                <SelectClient
                    data={currencys}
                    placeholder="Select currency..."
                    label="Select Currency"
                    labelProps={{ className: 'hidden' }}
                    value="AUD"
                    props={{
                        className: "!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal",
                        children: <></>
                    }}
                />
            </ThemeProviderClient>
        </div>
    )
}