'use client'

import { Option, Select, SelectProps } from "@material-tailwind/react"
import { SelectOptionsT } from "./types"
import { ChangeEvent, useEffect, useState } from "react"
import TextInput from "@/src/components/inputs/TextInput"
import TypographyClient from "../typography/TypographyClienct"

type Props = {
    props: SelectProps
    data: SelectOptionsT[]
    labelProps?: Object
    value?: string
    label?: string
    placeholder?: string
    activeSearch?: boolean
    title?: string
    isRequired?: boolean
    isStarSign?: boolean
    txtDesc?: string
    classTxtDesc?: string
    clickMenu?: (name: string, value: string)=>void
}

export default function SelectClient({
    props,
    data,
    labelProps,
    label,
    value,
    placeholder,
    activeSearch,
    title,
    isRequired,
    isStarSign = true,
    txtDesc,
    classTxtDesc,
    clickMenu
}: Props) {
    const [newData, setNewData] = useState<SelectOptionsT[]>(data)
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        if (searchValue) {
            const search = data.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.value.toLowerCase().includes(searchValue.toLowerCase())
            )
            setNewData(search)
        } else {
            setNewData(data)
        }
    }, [searchValue])

    useEffect(()=>{
        setNewData(data)
    }, [data])

    function handleSearch(e: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value)
    }

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

            <Select
                placeholder={placeholder}
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                label={label}
                labelProps={labelProps}
                value={value}
                {...props}
            >
                {activeSearch ?
                    <div className="mb-3">
                        <TextInput
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search here.."
                            classInput="font-inter"
                            value={searchValue}
                            containerProps="!min-w-0"
                        />
                    </div>
                    : <></>
                }
                {newData.length > 0 ? newData.map((item, i) => (
                    <Option key={i} className={`list-none ${item.name === value ? 'text-blue-gray-900 bg-blue-gray-50 bg-opacity-80' : 'text-[#737373]'} pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline outline-0 transition-all`} onClick={()=>{
                        if(clickMenu){
                            clickMenu(item.name, item.value)
                        }
                    }}>{item.name}</Option>
                )) :
                    <TypographyClient
                        title="No options"
                        props={{
                            children: <></>,
                            className: 'font-inter text-sm text-[#737373]'
                        }}
                    />
                }
            </Select>
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