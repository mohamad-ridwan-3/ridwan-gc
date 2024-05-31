import TypographyClient from "@/src/lib/client/typography/TypographyClienct"

type Props = {
    status: 'Pending'
}

export default function Status({
    status
}:Props){
    const statusDesc = 
    status === 'Pending' ?
    'Your order is Pending. currently waiting for the next process to continue delivery' :
    ''
    return (
        <div className="mt-8 bg-[#fafafa] p-3 space-y-3">
            <TypographyClient
                title={status}
                props={{
                    children: <></>,
                    className: 'font-inter font-bold text-[#171717] text-lg'
                }}
            />
            <TypographyClient
                title={statusDesc}
                props={{
                    children: <></>,
                    className: 'font-inter font-normal text-[#171717] text-sm'
                }}
            />
        </div>
    )
}