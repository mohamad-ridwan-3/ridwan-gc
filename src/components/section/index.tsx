import { ReactNode } from "react"

type Props = {
    title: string
    children: ReactNode
}

export default function Section({
    title,
    children
}: Props) {
    return (
        <section className="flex flex-col mt-4">
            <div className="flex justify-center flex-col w-full items-center">
                <h2 className="py-6 font-avant-garde font-medium text-2xl text-center">
                    {title}
                </h2>

                <hr className="w-[50px] border-t-[1.5px] border-t-black flex mb-5"/>
            </div>
            {children}
        </section>
    )
}