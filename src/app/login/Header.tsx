import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { staticImages } from "@/src/utils";
import { convertImageLoader, toBase64ImageLoader } from "@/src/utils/blurDataURLImg";
import Image from "next/image";

export default function HeaderAuth() {
    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <Image
                    src={`${staticImages}/gangco.png`}
                    alt="login"
                    height={60}
                    width={200}
                    decoding="async"
                    fetchPriority="high"
                    placeholder="blur" 
                    blurDataURL={`data:image/svg+xml;base64,${toBase64ImageLoader(
                        convertImageLoader(200, 20)
                    )}`}
                />
            </div>

            <div className="space-y-2">
                <TypographyClient
                    title="Welcome to Gangco!"
                    props={{
                        variant: 'h1',
                        children: <></>,
                        className: 'font-inter text-2xl'
                    }}
                />
                <TypographyClient
                    title="Please sign-in to your account and start to continue."
                    props={{
                        children: <></>,
                        className: 'font-inter text-sm text-[#737373]'
                    }}
                />
            </div>
        </div>
    )
}