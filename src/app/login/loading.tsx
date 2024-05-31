import CardClient from "@/src/lib/client/cards/CardClient";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

export default function Loading() {
    return (
        <div
            className="bg-[#fff] dark:bg-gray-900 min-h-screen items-center justify-center flex py-4"
        >
            <div
                className="flex flex-col items-center justify-center min-h-[400px] w-full sm:w-[468px] px-6 mx-auto lg:py-0"
            >
                <CardClient
                    props={{
                        className: 'py-12 px-8 bg-white animate-pulse w-full shadow-none',
                        children: <></>,
                    }}
                >
                    <div className="space-y-8">
                        <div className="h-[60px] w-[70%] sm:w-[200px] bg-gray-200 mx-auto mb-12"></div>

                        <div className="space-y-2">
                            <TypographyClient
                                props={{
                                    as: "div",
                                    variant: "h1",
                                    className: "h-2 w-[60%] rounded-full bg-gray-300",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                            <TypographyClient
                                props={{
                                    as: "div",
                                    variant: "h1",
                                    className: "h-2 w-full rounded-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                        </div>

                        <div className="space-y-4 mt-6">
                            <TypographyClient
                                props={{
                                    as: "div",
                                    className: "h-10 w-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                            <TypographyClient
                                props={{
                                    as: "div",
                                    className: "h-10 w-full bg-gray-200",
                                    children: <></>
                                }}
                            >
                                &nbsp;
                            </TypographyClient>
                            <div className="pt-2">
                                <TypographyClient
                                    props={{
                                        as: "div",
                                        className: "h-10 w-full bg-gray-400",
                                        children: <></>
                                    }}
                                >
                                    &nbsp;
                                </TypographyClient>
                            </div>
                        </div>
                    </div>
                </CardClient>
            </div>
        </div>
    )
}