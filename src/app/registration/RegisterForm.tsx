'use client'

import CheckboxLabel from "@/src/components/inputs/CheckboxLabel"
import DatePickerInput from "@/src/components/inputs/DatePickerInput"
import TextInput from "@/src/components/inputs/TextInput"
import ButtonClient from "@/src/lib/client/buttons/ButtonClient"
import SelectClient from "@/src/lib/client/selects/SelectClient"
import ThemeProviderClient from "@/src/lib/client/theme/ThemeProviderClient"
import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import Link from "next/link"
import { useEffect, useState } from "react"
import SubmitButton from "./SubmitButton"
import { useFormState } from "react-dom"
import registration from "@/src/lib/server-actions/auth/registration"
import { LoginResultT } from "@/src/types/login"
import { success_registration } from "@/src/utils"
import { useRouter } from "next/navigation"

const initialState = {
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
    status: 0,
    token: '',
    data: {
        created_at: '',
        email: '',
        id: 0,
        name: '',
        phone: '',
        updated_at: ''
    },
    result: true
}

type SelectOptionsT = {
    name: string
    value: string
}

type GenderT = {
    gender: 'male' | 'female'
}

export default function RegisterForm() {
    const [state, formAction] = useFormState(registration as any, initialState)
    const [isError, setIsError] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [gender, setGender] = useState<GenderT>({ gender: 'male' })
    const [errMessage, setErrMessage] = useState({} as LoginResultT)

    const router = useRouter()

    function getPending(): void {
        setErrMessage({} as LoginResultT)
    }

    useEffect(() => {
        if (state?.data?.name) {
            const currentTime = new Date()
            const setExpiredSuccessRegistration = new Date(currentTime.getTime() + (10 * 1000)).toUTCString()
            document.cookie = `${success_registration}=successful registration; expires=${setExpiredSuccessRegistration}`
            router.push('/registration/success-registration')
        } else if (state?.result === false) {
            setErrMessage({
                message: state.message,
                result: state.result,
                data: null
            })
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 50)
        }
    }, [state])

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const customTheme = {
        select: {
            styles: {
                base: {
                    container: {
                        minWidth: 'min-w-[0px]'
                    }
                }
            }
        }
    }

    const selectCountries: SelectOptionsT[] = [
        {
            name: 'Indonesia',
            value: 'ID'
        },
        {
            name: 'Malaysia',
            value: 'MY'
        },
        {
            name: 'Jepang',
            value: 'JP'
        },
    ]

    function handleGenderChange(gender: 'male' | 'female'): void {
        setGender({ gender: gender })
    }

    return (
        <form
            action={formAction}
            className="space-y-4 mt-12"
        >
            <TextInput
                title="First Name"
                type='text'
                name='firstName'
                isRequired
                isStarSign={false}
            />
            <TextInput
                title="Last Name"
                type='text'
                name='lastName'
                isRequired
                isStarSign={false}
            />
            <TextInput
                title="E-Mail"
                type='email'
                name='email'
                isRequired
                isStarSign={false}
            />
            <TextInput
                title="Password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                isRequired
                isStarSign={false}
                icon={showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}
                clickIcon={() => setShowPassword(!showPassword)}
            />
            <TextInput
                title="Password Confirmation"
                type={showPasswordConfirm ? 'text' : 'password'}
                name='password_confirmation'
                isRequired
                isStarSign={false}
                icon={showPasswordConfirm ? 'ph:eye-light' : 'ph:eye-slash-light'}
                clickIcon={() => setShowPasswordConfirm(!showPasswordConfirm)}
            />
            <div>
                <TypographyClient
                    props={{
                        className: 'text-xs font-inter mb-1',
                        children: <></>
                    }}
                >
                    Country & Phone Number
                </TypographyClient>
                <div className="grid grid-cols-1 sm:screen-d-sm:grid-cols-3 sm:screen-d-sm:gap-2 space-y-2 sm:screen-d-sm:space-y-0">
                    <ThemeProviderClient value={customTheme}>
                        <SelectClient
                            data={selectCountries}
                            placeholder="Select country"
                            labelProps={{ className: 'hidden' }}
                            value="Indonesia"
                            props={{
                                className: "!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal",
                                children: <></>
                            }}
                        />
                    </ThemeProviderClient>
                    <div className="col-span-2">
                        <TextInput
                            type="number"
                            name="phone"
                            isRequired
                            isStarSign={false}
                            placeholder="eg. 0123456789"
                            containerProps="!min-w-[100px]"
                        />
                    </div>
                </div>
            </div>
            <DatePickerInput
                isRequired
                isStarSign={false}
                title="Birth Date"
                value={value}
                handleValueChange={handleValueChange}
                useRange={false}
                asSingle={true}
                inputClassName="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-[#737373] placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 font-inter font-normal"
            />
            <div className="flex sm:screen-d-sm:items-center flex-col sm:screen-d-sm:flex-row">
                <TypographyClient
                    props={{
                        className: 'text-xs font-inter mb-1',
                        children: <></>
                    }}
                >
                    Gender:
                </TypographyClient>
                <div className="sm:screen-d-sm:ml-3 space-x-3">
                    <CheckboxLabel
                        label="I am MALE"
                        labelClassName="text-black font-inter font-light mb-0 text-sm"
                        checked={gender.gender === 'male'}
                        onChange={() => handleGenderChange('male')}
                    />
                    <CheckboxLabel
                        label="I am FEMALE"
                        labelClassName="text-black font-inter font-light mb-0 text-sm"
                        checked={gender.gender === 'female'}
                        onChange={() => handleGenderChange('female')}
                    />
                </div>
            </div>
            {errMessage?.message &&
                <TypographyClient
                    props={{
                        className: `font-inter mt-1 font-normal text-sm text-red-500`,
                        children: <></>
                    }}
                >
                    {errMessage?.message}
                </TypographyClient>
            }
            <div>
                <SubmitButton
                    isError={isError}
                    getPending={getPending}
                />
            </div>

            <div>
                <Link href="/login">
                    <ButtonClient
                        props={{
                            size: "lg",
                            className: "rounded-md shadow-none normal-case font-inter tracking-wide w-full hover:opacity-[0.96] transition-all font-normal border-gray-300",
                            children: <></>,
                            type: 'button',
                            variant: 'outlined'
                        }}
                    >
                        Sign In
                    </ButtonClient>
                </Link>
            </div>
        </form>
    )
}