import Iconify from "@/src/components/Iconify";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import { ListOrderItemsT } from "@/src/types/order";
import Product from "../Product";

type Props = {
    order_number: string
    items: ListOrderItemsT[]
}

export default function ListsProduct({
    order_number,
    items
}: Props) {
    return (
        <div className="py-4 border-b">
            <div className="flex items-center">
                <Iconify
                    icon="lets-icons:order-duotone"
                />
                <TypographyClient
                    title={order_number}
                    props={{
                        children: <></>,
                        className: 'font-inter font-bold text-[#171717] text-sm'
                    }}
                />
            </div>
            <div className="mt-4">
                {items.map((product, i)=>(
                    <Product
                        key={i}
                        image={product.image}
                        name={product.name}
                        quantity={product.quantity}
                        total={product.total}
                        variant={product.variant}
                    />
                ))}
            </div>
        </div>
    )
}