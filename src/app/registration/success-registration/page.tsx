import Iconify from "@/src/components/Iconify";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import Link from "next/link";

export default function SuccessRegistration() {
    return (
        <div className="min-h-screen items-center justify-center flex py-4">
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full sm:w-[568px] px-6 mx-auto lg:py-0">
                <div className="py-12 w-full items-center flex flex-col">
                    <div className="space-y-4 flex flex-col items-center">
                        <Iconify
                            icon="prime:check-circle"
                            width={80}
                            height={80}
                            className="text-[#212121]"
                        />
                        <TypographyClient
                            title="Registration successful!"
                            props={{
                                children: <></>,
                                className: 'font-inter text-2xl text-center font-semibold',
                            }}
                        />
                    </div>
                    <div className="mt-12 space-y-2">
                        <TypographyClient
                            title="Your account has been successfully created now."
                            props={{
                                children: <></>,
                                className: 'font-inter text-sm text-center font-light text-[#737373]',
                            }}
                        />
                        <TypographyClient
                            title="Please sign in to continue"
                            props={{
                                children: <></>,
                                className: 'font-inter text-sm text-center font-light text-[#737373]',
                            }}
                        />
                        <div className="pt-2">
                            <Link href="/login">
                                <ButtonClient
                                    props={{
                                        size: "lg",
                                        className: "rounded-md shadow-none normal-case font-inter font-semibold tracking-wide w-full hover:opacity-[0.96] transition-all mt-1",
                                        children: <></>,
                                        type: 'button',
                                    }}
                                >
                                    Sign In
                                </ButtonClient>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}