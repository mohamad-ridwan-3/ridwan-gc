import ButtonClient from "@/src/lib/client/buttons/ButtonClient"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

type SubmitButtonProps = {
    isError: boolean
    getPending: ()=>void
}

export default function SubmitButton({
    isError,
    getPending
}: SubmitButtonProps) {
    const { pending } = useFormStatus()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        getPending()
        if (pending && !loading) {
            setLoading(true)
        }
    }, [pending])

    useEffect(() => {
        setLoading(false)
    }, [isError])
    return (
        <ButtonClient
            props={{
                size: "lg",
                className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-full hover:opacity-[0.96] transition-all mt-1 justify-center",
                children: <></>,
                type: 'submit',
                disabled: loading,
                loading: loading
            }}
        >
            Login
        </ButtonClient>
    )
}