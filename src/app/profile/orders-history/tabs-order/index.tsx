import { LabelTabListT, TabListsOrderHistoryT } from "@/src/types/order";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import WrapProduct from "./WrapProduct";
import NoValuesOfContent from "../../NoValuesOfContent";
import { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import Link from "next/link";

type Props = {
    lists: TabListsOrderHistoryT[]
}

export default function TabsOrder({
    lists
}: Props) {
    const [activeTab, setActiveTab] = useState<LabelTabListT>('All')
    const [onFixedListTab, setOnFixedListTab] = useState<boolean>(false)
    const wrapTabHeaderRef = useRef<HTMLDivElement | null>(null)

    function scrollTabHeader(): void {
        const currentScrollY = Math.floor(window.pageYOffset)

        const offset = Math.floor(wrapTabHeaderRef.current?.getBoundingClientRect().top as number)
        const currentWrapTabPosition = currentScrollY + offset
        if (scrollY > currentWrapTabPosition) {
            setOnFixedListTab(true)
        } else {
            setOnFixedListTab(false)
        }
    }

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            wrapTabHeaderRef.current
        ) {
            const timeOut = setTimeout(() => {
                window.addEventListener('scroll', scrollTabHeader)
            }, 0);

            return () => {
                window.clearTimeout(timeOut)
                window.removeEventListener('scroll', scrollTabHeader, false)
            }
        }
    }, [])

    return (
        <div className="mt-8">
            <Tabs
                value="all"
            >
                <div
                    ref={wrapTabHeaderRef}
                >
                    <TabsHeader
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        placeholder=""
                        className={`ml-1 mr-0 rounded-none p-0 !pt-4 !pb-0.5 w-fit flex ${onFixedListTab ? `fixed top-[60px] z-[999] left-0 w-full !bg-white shadow justify-center` : 'bg-transparent'}`}
                        indicatorProps={{
                            className: 'bg-transparent border-b-2 border-[#171717] shadow-none rounded-none'
                        }}
                    >
                        <div className={`${onFixedListTab ? 'w-[80rem] max-w-7xl flex pl-6': ''}`}>
                            <ScrollContainer
                                className="overflow-x-auto flex max-w-[85vw] screen-tm1-sm:max-w-[92vw]"
                            >
                                {lists.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onPointerEnterCapture=""
                                        onPointerLeaveCapture=""
                                        onClick={() => setActiveTab(label)}
                                        placeholder=""
                                        className={`font-inter text-sm whitespace-nowrap py-2 px-8 ${label === activeTab ? 'text-[#171717]' : 'text-[#737373]'}`}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </ScrollContainer>
                        </div>
                    </TabsHeader>
                </div>
                <TabsBody
                    className="w-full"
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    placeholder=""
                    animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                    }}
                >
                    {lists.map(({ value, data }) => (
                        <TabPanel
                            className="w-full pl-1 pr-1 py-4 space-y-6"
                            key={value}
                            value={value}
                        >
                            {data?.map(({
                                order_number,
                                items,
                                status,
                                total,
                                subtotal,
                                created_at
                            }, index) => (
                                <WrapProduct
                                    key={index}
                                    order_number={order_number}
                                    status={status}
                                    items={items}
                                    total={total}
                                    subtotal={subtotal}
                                    created_at={created_at}
                                />
                            ))}
                            {data.length === 0 &&
                                <div className="flex flex-col">
                                    <NoValuesOfContent
                                        icon="fluent-mdl2:product-variant"
                                        title="You have not yet made any purchases."
                                        desc="Come on, start shopping with our quality products that fulfill your desires!"
                                    />
                                    <Link
                                        href="/"
                                        className="mx-auto mt-5"
                                    >
                                        <ButtonClient
                                            title="Start Shopping"
                                            props={{
                                                children: <></>,
                                                className: 'font-inter'
                                            }}
                                        />
                                    </Link>
                                </div>
                            }
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    )
}