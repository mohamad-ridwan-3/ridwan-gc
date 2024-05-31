import { AttributeValueT, SelectVariantT } from "@/src/types/products"
import ButtonVariant from "../ButtonVariant"

type Props = {
    selectVariant: SelectVariantT
    dataVariant: AttributeValueT[]
    clickVariant: (item: AttributeValueT) => void
}

export default function FirstAttribute({
    selectVariant,
    dataVariant,
    clickVariant
}: Props) {
    return (
        <div className="p-4 flex flex-col">
            <h1 className="font-bold text-[#171717] font-inter">
                {selectVariant.attribute_name}:
            </h1>

            <div className="flex flex-wrap mt-2">
                {dataVariant.length > 0 && dataVariant.map((item, i) => (
                    <div key={i} className="mr-2 flex">
                        <ButtonVariant
                            isActive={item.name == selectVariant.attribute_value_name}
                            name={item.name}
                            image={item.image}
                            onClick={() => clickVariant(item)}
                            isOutStock={Number(item?.stock) === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}