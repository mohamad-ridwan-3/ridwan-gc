'use client'

import TextInput from "@/src/components/inputs/TextInput"
import { useState } from "react"

export default function PasswordClient() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <TextInput
            title="Password"
            type={showPassword ? 'text' : 'password'}
            classInput="shadow-sm"
            // txtDesc="Required field"
            classTxtDesc="text-red-500 text-xs"
            icon={showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'}
            clickIcon={() => setShowPassword(!showPassword)}
        />
    )
}