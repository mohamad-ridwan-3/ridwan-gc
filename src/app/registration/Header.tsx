import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

export default function Header() {
    return (
        <>
            <TypographyClient
                title="CREATE AN ACCOUNT"
                props={{
                    children: <></>,
                    className: 'font-inter text-[2rem] text-center font-medium',
                    variant: 'h1'
                }}
            />
            <TypographyClient
                title="Create your Gangco account to start shopping and proceed order easily."
                props={{
                    children: <></>,
                    className: 'font-inter text-sm text-center font-light mt-6',
                }}
            />
        </>
    )
}