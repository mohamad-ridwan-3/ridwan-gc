'use client'

import { ThemeProvider } from "@material-tailwind/react";

type Props = {
    children: any
    value: Object
}

export default function ThemeProviderClient({
    children,
    value
}: Props){
    return (
        <ThemeProvider value={value}>
            {children}
        </ThemeProvider>
    )
}