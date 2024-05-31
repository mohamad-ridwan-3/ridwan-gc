'use client'

import { useEffect } from 'react'
import HeaderContent from '../lib/server/not-found-content/Header'
import TypographyClient from '../lib/client/typography/TypographyClienct'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[65vh] min-container-h:min-h-screen w-full flex flex-col">
            <div className="flex flex-col font-inter bg-[#fafafa] w-screen">
                <HeaderContent
                    title='Sorry, something went wrong there. Try again.'
                />
            </div>
            <div className="p-8 flex flex-col">
                <TypographyClient
                    props={{
                        variant: "h6",
                        className: "font-inter text-center text-[#737373]",
                        children: <></>
                    }}
                >
                    500 - a server error occurred...
                </TypographyClient>
            </div>
        </div>
    )
}