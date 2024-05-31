import LoginForm from "./LoginForm";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";

export default async function Login() {
    return (
        // <div
        //     className="bg-[#fafafa] dark:bg-gray-900 min-h-screen items-center justify-center flex py-4"
        // >
        //     <div
        //         className="flex flex-col items-center justify-center min-h-[400px] w-full sm:w-[468px] px-6 mx-auto lg:py-0"
        //     >
        //         <CardClient
        //             props={{
        //                 className: 'py-12 px-8 bg-white',
        //                 children: <></>,
        //             }}
        //         >
        //             <HeaderAuth />
        //             <LoginForm />
        //         </CardClient>
        //     </div>
        // </div>

        <div className="min-h-screen items-center justify-center flex py-4">
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full sm:w-[568px] px-6 mx-auto lg:py-0">
                <div className="py-12 w-full">
                    <TypographyClient
                        title="PLEASE SIGN IN"
                        props={{
                            children: <></>,
                            className: 'font-inter text-[2rem] text-center font-medium',
                            variant: 'h1'
                        }}
                    />
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}