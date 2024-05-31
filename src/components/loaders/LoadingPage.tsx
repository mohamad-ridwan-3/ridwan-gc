import SpinnerClient from "@/src/lib/client/spinners/SpinnerClient";
import { staticImages } from "@/src/utils";
import Image from "next/image";

export default function LoadingPage(){
    return(
        <div className="flex flex-col items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-[9999999] bg-white gap-8">
            <Image 
                src={`${staticImages}/gangco.png`}
                alt="storefront"
                height={200}
                width={200}
                className="object-contain max-h-full max-w-full"
                decoding="sync"
                fetchPriority="high"
                loading="eager"
            />
            <SpinnerClient
                props={{
                    className: "h-10 w-10"
                }}
            />
        </div>
    )
}