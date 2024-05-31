'use client'

import { ChangeEvent, useEffect, useState } from "react"
import TextInput from "@/src/components/inputs/TextInput"
import ButtonClient from "@/src/lib/client/buttons/ButtonClient"
import SelectClient from "@/src/lib/client/selects/SelectClient"
import { SelectOptionsT } from "@/src/lib/client/selects/types"
import addCustomerAddress from "@/src/lib/server-actions/customer/addCustomerAddress"
import toast from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import { useFormik } from "formik"
import { ListCustomerAddressT, ReqAddCustomerAddressT, ReqUpdateCustomerAddressT } from "@/src/types/profile"
import CheckboxLabel from "@/src/components/inputs/CheckboxLabel"
import updateCustomerAddress from "@/src/lib/server-actions/customer/updateCustomerAddress"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"

type Props = {
    region: any
    state: any
    district: any
    data?: ListCustomerAddressT
    id?: string
}

export default function Form({
    region: regionData,
    state,
    district,
    data,
    id
}: Props) {
    const [selectType, setSelectType] = useState<any>({})
    const [typeOptions, setTypeOptions] = useState<SelectOptionsT[]>([
        {
            name: 'office',
            value: 'office'
        },
        {
            name: 'home',
            value: 'home'
        },
        {
            name: 'other',
            value: 'other'
        }
    ])
    const [selectCountryCode, setSelectCountryCode] = useState<any>({})
    const [countryCode, setCountryCode] = useState<SelectOptionsT[]>(regionData.map((item: any) => ({
        name: `${`${item?.phone_code ?? 'nothing'} (${item?.name})` ?? 0}`,
        value: item?.name ?? 'nothing'
    })))
    const [selectRegion, setSelectRegion] = useState<any>({})
    const [region, setRegion] = useState<SelectOptionsT[]>(regionData.map((item: any) => ({
        name: item?.name ?? 'nothing',
        value: item?.name ?? 'nothing'
    })))
    const [selectState, setSelectState] = useState<any>({})
    const [stateAddress, setStateAddress] = useState<SelectOptionsT[]>([])
    const [selectCity, setSelectCity] = useState<any>({})
    const [city, setCity] = useState<SelectOptionsT[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const pathname = usePathname()
    const router = useRouter()

    const formik = useFormik({
        // type be office | home | other
        initialValues: {
            type: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            country: null,
            short_country: null,
            state: null,
            short_state: null,
            city: null,
            postcode: '',
            is_default: false
        },
        onSubmit: async (values, formikHelpers) => {
            setLoading(true)
            let newData = {} as ReqAddCustomerAddressT & {
                id?: number
            }
            if (pathname === '/profile/address-list/add') {
                newData = {
                    type: values.type,
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    country: selectRegion?.name ?? null,
                    short_country: selectRegion?.iso2 ?? null,
                    state: selectState?.name ?? null,
                    short_state: selectState?.short_name ?? null,
                    city: selectCity?.name ?? null,
                    postcode: `${values.postcode}`,
                    is_default: values.is_default
                }
            } else {
                newData = {
                    id: Number(id),
                    type: values.type,
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    country: selectRegion?.name ?? null,
                    short_country: selectRegion?.iso2 ?? null,
                    state: selectState?.name ?? null,
                    short_state: selectState?.short_name ?? null,
                    city: selectCity?.name ?? null,
                    postcode: `${values.postcode}`,
                    is_default: values.is_default
                }
            }
            const result = pathname === '/profile/address-list/add' ?
                await addCustomerAddress(newData) :
                await updateCustomerAddress(newData as ReqUpdateCustomerAddressT)
            if (result?.result) {
                toast.dismiss()
                toast.success(result.message)
                setLoading(false)
                if (data) {
                    return
                }
                formikHelpers.resetForm()
                setSelectCity({})
                setCity([])
                setSelectCountryCode({})
                setSelectState({})
                setStateAddress([])
                setSelectRegion({})
            } else if (result?.result === false) {
                toast.dismiss()
                toast.error(result?.message ?? 'There is an error. Please try again')
                setLoading(false)
            } else {
                router.push('/login')
            }
        }
    })

    function defaultDataForUpdate(): void {
        if (data) {
            setSelectType({
                name: data.type,
                value: data.type
            })
            const findRegion = regionData.find((item: any) => item.name === data.country)
            setSelectCountryCode(findRegion ?? {})
            setSelectRegion(findRegion ?? {})
            const findState = state[findRegion?.name ?? '']?.find((item: any) => item?.name === data.state)
            setSelectState(findState ?? {})
            if (findState) {
                const findCity = district[findState.name].find((item: any) => item?.name === data.city)
                setSelectCity(findCity)
            }
            formik.setValues({
                type: data.type,
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                country: data.country as never,
                short_country: data.short_country as never,
                state: data.state as never,
                short_state: data.short_state as never,
                city: data.city as never,
                postcode: data.postcode,
                is_default: data.is_default === 1
            })
        }
    }

    useEffect(() => {
        if (data?.id) {
            defaultDataForUpdate()
        }
    }, [
        data,
        regionData,
        state,
        district
    ])

    const classNameSelect = '!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal'

    function clickMenu(name: string, value: string): void {
        const findRegion = regionData.find((item: any) => item?.name === value)
        setSelectCountryCode(findRegion)
    }
    function handleRegion(name: string, value: string): void {
        const findRegion = regionData.find((item: any) => item?.name === value)
        setSelectRegion(findRegion)
        setSelectCity({})
        setSelectState({})
    }

    function handleState(name: string, value: string): void {
        const findState = state[selectRegion.name].find((item: any) => item?.name === value)
        setSelectState(findState)
        setSelectCity({})
    }
    function handleCity(name: string, value: string): void {
        const findCity = district[selectState.name].find((item: any) => item?.name === value)
        setSelectCity(findCity)
    }

    function handleType(name: string, value: string): void {
        setSelectType({
            name,
            value
        })
    }

    useEffect(() => {
        if (selectRegion?.name) {
            const findState = state[selectRegion?.name ?? 'nothing']
            if (!findState) {
                toast.dismiss()
                toast.error('List of states unknown!')
            } else {
                setStateAddress(findState.map((item: any) => ({
                    name: item.name,
                    value: item.name
                })))
            }
        } else if (!data) {
            setStateAddress([])
            setSelectState({})
        }
    }, [selectRegion, data])

    useEffect(() => {
        if (selectState?.name) {
            const findCity = district[selectState?.name ?? 'nothing']
            if (!findCity) {
                toast.dismiss()
                toast.error('City list unknown!')
            } else {
                setCity(findCity.map((item: any) => ({
                    name: item.name,
                    value: item.name
                })))
            }
        } else if (!data) {
            setCity([])
            setSelectCity({})
        }
    }, [selectState, data])

    function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>): void {
        formik.setValues({
            ...formik.values,
            is_default: e.target.checked
        })
    }

    return (
        <form
            className="flex flex-col w-full space-y-3"
            onSubmit={formik.handleSubmit}
        >
            <SelectClient
                props={{
                    children: <></>,
                    className: classNameSelect,
                    containerProps: {
                        className: '!min-w-0'
                    }
                }}
                value={selectType?.name ?? ''}
                labelProps={{ className: 'hidden' }}
                data={typeOptions}
                activeSearch={true}
                title="Type"
                isRequired
                classTxtDesc="text-red-500"
                clickMenu={handleType}
            />
            <TextInput
                title="Name"
                isRequired
                type="text"
                classInput="shadow-sm"
                name="name"
                // txtDesc="Required field"
                classTxtDesc="text-red-500"
                containerProps="!min-w-0"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <div>
                <TextInput
                    title="Phone"
                    isRequired
                    type="number"
                    classInput="shadow-sm"
                    name="phone"
                    // txtDesc="Required field"
                    classTxtDesc="text-red-500"
                    containerProps="!min-w-0"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
                {selectRegion && selectRegion?.phone_code &&
                    <TypographyClient
                        title={`note (with country code Ex: ${selectRegion.phone_code}xxxx)`}
                        props={{
                            children: <></>,
                            className: 'font-inter text-xs font-normal mt-1 text-red-300'
                        }}
                    />
                }
                {!selectRegion?.name &&
                    <TypographyClient
                        title={'Select country to find out the beginning of valid phone numbers'}
                        props={{
                            children: <></>,
                            className: 'font-inter text-xs font-normal mt-1 text-red-300'
                        }}
                    />
                }
            </div>
            <TextInput
                title="E-mail Address"
                isRequired
                type="email"
                classInput="shadow-sm"
                name="email"
                // txtDesc="Required field"
                classTxtDesc="text-red-500"
                containerProps="!min-w-0"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            <TextInput
                title="Address"
                isRequired
                type="address"
                classInput="shadow-sm"
                name="address"
                // txtDesc="Required field"
                classTxtDesc="text-red-500"
                containerProps="!min-w-0"
                value={formik.values.address}
                onChange={formik.handleChange}
            />
            <SelectClient
                props={{
                    children: <></>,
                    className: classNameSelect,
                    containerProps: {
                        className: '!min-w-0'
                    }
                }}
                value={selectRegion?.name ?? ''}
                labelProps={{ className: 'hidden' }}
                data={region}
                activeSearch={true}
                title="Region"
                isRequired
                classTxtDesc="text-red-500"
                clickMenu={handleRegion}
            />
            <SelectClient
                props={{
                    children: <></>,
                    className: classNameSelect,
                    containerProps: {
                        className: '!min-w-0'
                    }
                }}
                value={selectState?.name ?? ''}
                labelProps={{ className: 'hidden' }}
                data={stateAddress}
                activeSearch={true}
                title="State"
                isRequired
                classTxtDesc="text-red-500"
                clickMenu={handleState}
            />
            <SelectClient
                props={{
                    children: <></>,
                    className: classNameSelect,
                    containerProps: {
                        className: '!min-w-0'
                    }
                }}
                labelProps={{ className: 'hidden' }}
                value={selectCity?.name ?? ''}
                data={city}
                activeSearch={true}
                title="City"
                isRequired
                classTxtDesc="text-red-500"
                clickMenu={handleCity}
            />
            <TextInput
                title="Post Code"
                isRequired
                type="number"
                classInput="shadow-sm"
                name="postcode"
                // txtDesc="Required field"
                classTxtDesc="text-red-500"
                containerProps="!min-w-0"
                value={formik.values.postcode}
                onChange={formik.handleChange}
            />
            <CheckboxLabel
                label="Set as default address"
                checked={formik.values.is_default}
                onChange={handleChangeCheckbox}
            />
            <div>
                <ButtonClient
                    title="Save"
                    props={{
                        children: <></>,
                        className: 'font-inter w-full justify-center',
                        type: 'submit',
                        disabled: loading,
                        loading: loading
                    }}
                />
            </div>
        </form>
    )
}