import TypographyClient from "@/src/lib/client/typography/TypographyClienct"
import Link from "next/link"

type MenuFooterT = {
    title: string
    children: {
        name: string
        path: string
    }[]
}

type PropsFooterMenu = {
    menu: MenuFooterT[]
}

export default function FooterMenu({
    menu
}: PropsFooterMenu) {
    return (
        <>
            {menu.map((item, i) => (
                <div key={i} className="flex flex-col">
                    <div className="flex flex-col space-y-4">
                        <TypographyClient
                            props={{
                                variant: "h3",
                                className: "font-inter font-semibold text-sm mb-0",
                                children: <></>
                            }}
                        >
                            {item.title}
                        </TypographyClient>

                        <ul className="flex flex-col space-y-4 ml-0 mb-0 list-none">
                            {item.children.map((child, iChild) => (
                                <li key={iChild} className="font-inter text-[#737373] font-normal text-sm">
                                    <Link
                                        href={child.path}
                                    >
                                        {child.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    )
}