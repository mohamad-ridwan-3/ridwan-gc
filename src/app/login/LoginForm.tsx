'use client'

import { useEffect, useState } from "react";
import TextInput from "@/src/components/inputs/TextInput";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import login from "@/src/lib/server-actions/auth/login";
import { useFormState } from "react-dom";
import { session_login_name } from "@/src/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/redux";
import { addUser } from "@/src/store/user/userSlice";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import ThemeProviderClient from "@/src/lib/client/theme/ThemeProviderClient";
import SelectClient from "@/src/lib/client/selects/SelectClient";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { LoginResultT } from "@/src/types/login";
import Cookies from "js-cookie";

const initialState = {
    email: '',
    password: '',
    message: '',
    status: 0,
    token: '',
    data: {
        access_token: '',
        expires_in: '',
        token_type: ''
    },
    result: true
}

type SubmitButtonProps = {
    isError: boolean
}

type SelectOptionsT = {
    name: string
    value: string
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login as any, initialState)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState({} as LoginResultT)
    // OTP
    const [isUseOTP, setIsUseOTP] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const router = useRouter()
    const cookies = Cookies

    function getPending(): void {
        setErrMessage({} as LoginResultT)
    }

    useEffect(() => {
        if (state?.data?.access_token) {
            const currentTime = new Date()
            currentTime.setMinutes(currentTime.getMinutes() + 60)
            dispatch(addUser({
                user: {
                    message: 'OK',
                    status: 200,
                    data: {}
                }
            }))
            cookies.set(session_login_name, state.data.access_token, { expires: currentTime })
            // document.cookie = `${session_login_name}=${state.data.access_token}; expires=${currentTime.toUTCString()}`
            router.push('/')
        } else if (!state?.data?.access_token) {
            setErrMessage({
                message: state?.message ?? 'There is an error. Please try again',
                result: state?.result ?? false,
                data: null
            })
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 50)
        }
    }, [state])

    function clickUseOTPORPassword(): void {
        setIsUseOTP(!isUseOTP)
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

    return (
        // <form
        //     className="space-y-4 mt-6"
        //     action={formAction}
        // >
        //     <TextInput
        //         title="Email Address"
        //         type="email"
        //         classInput="shadow-sm"
        //         name="email"
        //         isRequired
        //         isStarSign={false}
        //     />
        //     <TextInput
        //         title="Password"
        //         type={showPassword ? 'text' : 'password'}
        //         classInput="shadow-sm"
        //         icon={showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}
        //         name="password"
        //         clickIcon={() => setShowPassword(!showPassword)}
        //         isRequired
        //         classTxtDesc="text-red-500 text-sm"
        //         txtDesc={state?.status === 404 && state?.message ? state.message : ''}
        //         isStarSign={false}
        //     />
        //     <div>
        //         <SubmitButton isError={isError}/>
        //     </div>
        // </form>
        <form
            action={formAction}
            className="space-y-4 mt-12"
        >
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <TypographyClient
                        title={isUseOTP ? 'Country & Phone Number:' : 'Email'}
                        props={{
                            children: <></>,
                            className: 'font-inter font-light text-xs',
                        }}
                    />
                    <ButtonClient
                        title={isUseOTP ? 'USE PASSWORD' : 'USE OTP'}
                        props={{
                            children: <></>,
                            variant: 'outlined',
                            className: 'rounded-md shadow-none normal-case font-inter tracking-wide hover:opacity-[0.96] transition-all font-normal border-gray-300',
                            size: 'sm',
                            onClick: clickUseOTPORPassword
                        }}
                    />
                </div>
                {isUseOTP ? (
                    <div className="grid grid-cols-1 sm:screen-d-sm:grid-cols-3 gap-1">
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
                        <div>
                            <TextInput
                                type="number"
                                name="phone"
                                isRequired
                                isStarSign={false}
                                placeholder="eg. 0123456789"
                                containerProps="!min-w-[100px]"
                            />
                        </div>
                        <ButtonClient
                            props={{
                                size: "sm",
                                className: "rounded-md shadow-none normal-case font-inter tracking-wide w-full hover:opacity-[0.96] transition-all font-normal border-gray-300",
                                children: <></>,
                                type: 'button',
                                variant: 'outlined'
                            }}
                        >
                            SEND OTP
                        </ButtonClient>
                    </div>
                ) : (
                    <TextInput
                        type="email"
                        name="email"
                        isRequired
                        isStarSign={false}
                        placeholder="eg. john@doe.com"
                        classInput="w-full"
                    />
                )}
            </div>
            <div className="space-y-2">
                <TypographyClient
                    title={isUseOTP ? 'Input OTP:' : 'Password'}
                    props={{
                        children: <></>,
                        className: 'font-inter font-light text-xs'
                    }}
                />
                {isUseOTP ?
                    <TextInput
                        type={'number'}
                        name={'otp'}
                        isRequired
                        isStarSign={false}
                        txtDesc={errMessage?.message}
                        classTxtDesc="text-red-500 text-sm"
                    />
                    :
                    <TextInput
                        type={showPassword ? 'text' : 'password'}
                        name={'password'}
                        isRequired
                        isStarSign={false}
                        txtDesc={errMessage?.message}
                        classTxtDesc="text-red-500 text-sm"
                        icon={showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}
                        clickIcon={() => setShowPassword(!showPassword)}
                    />
                }
            </div>
            <div>
                <SubmitButton
                    isError={isError}
                    getPending={getPending}
                />
            </div>
            <div>
                <Link href="/registration">
                    <ButtonClient
                        props={{
                            size: "lg",
                            className: "rounded-md shadow-none normal-case font-inter tracking-wide w-full hover:opacity-[0.96] transition-all font-normal border-gray-300",
                            children: <></>,
                            type: 'button',
                            variant: 'outlined'
                        }}
                    >
                        Create Account
                    </ButtonClient>
                </Link>
            </div>
            <div>
                <Link href="/">
                    <ButtonClient
                        props={{
                            size: "lg",
                            className: "rounded-md shadow-none normal-case font-inter tracking-wide w-full hover:opacity-[0.96] transition-all font-normal border-gray-300",
                            children: <></>,
                            type: 'button',
                            variant: 'outlined'
                        }}
                    >
                        Back to shopping
                    </ButtonClient>
                </Link>
            </div>
        </form>
    )
}