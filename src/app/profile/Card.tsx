import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import CardClient from "@/src/lib/client/cards/CardClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { CardProfileInfoT } from "@/src/types/profile";
import Link from "next/link";
import DefaultAddressInfo from "./DefaultAddressInfo";

type Props = CardProfileInfoT

export default function CardProfile({
    title,
    desc,
    slug,
    btnName,
    icon,
    label,
    value
}: Props) {
    const color = '#171717'
    return (
        <CardClient
            props={{
                className: 'flex flex-col px-6 py-8 border',
                children: <></>
            }}
        >
            <div className="flex justify-center">
                <Iconify
                    icon={icon}
                    className="text-[#737373]"
                    height={65}
                    width={65}
                />
            </div>
            <div className="space-y-6">
                <TypographyClient
                    title={title}
                    props={{
                        children: <></>,
                        as: 'h1',
                        className: `font-inter text-lg font-bold text-center text-[${color}]`
                    }}
                />
                <div className="flex flex-wrap justify-center items-center">
                    {desc &&
                        <TypographyClient
                            title={desc}
                            props={{
                                children: <></>,
                                className: `font-inter font-light text-[#737373] text-center text-sm`
                            }}
                        />
                    }
                </div>
                {label === 'address' &&
                    <DefaultAddressInfo
                        defaultAddress={value as string}
                    />
                }
                {btnName &&
                    <div className="flex justify-center">
                        <Link href={slug as string}>
                            <ButtonClient
                                title={btnName}
                                props={{
                                    children: <></>,
                                    size: 'sm',
                                    variant: 'outlined',
                                    className: 'font-inter'
                                }}
                            />
                        </Link>
                    </div>
                }
            </div>
        </CardClient>
    )
}