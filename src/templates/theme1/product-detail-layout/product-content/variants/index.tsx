import { useMemo } from "react";
import { AttributeValueT, DataVariantProductT } from "@/src/types/products";
import ButtonVariant from "./ButtonVariant";
import HeaderOptions from "./HeaderOptions";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    dataVariants: DataVariantProductT
    clickFirstAttribute: (value: string) => void
    clickSecondAttribute: (value: string) => void
}

export default function DesktopVariant({
    dataVariants,
    clickFirstAttribute,
    clickSecondAttribute
}: Props) {
    const firstAttribute = useMemo((): AttributeValueT[] => {
        if (dataVariants.variant?.length > 0 && dataVariants.variant[0]?.attributeValue?.length > 0) {
            return dataVariants.variant[0].attributeValue
        }
        return []
    }, [dataVariants])
    const secondAttribute = useMemo(() => {
        if (dataVariants.variant?.length > 1 && dataVariants.variant[1]?.attributeValue?.length > 0) {
            return dataVariants.variant[1].attributeValue
        }
        return []
    }, [])

    // header variant on mobile
    const headerVariantMobile = useMemo((): string => {
        if (dataVariants.variant.length === 1) {
            return `${dataVariants.variant[0].attributeValue.length} ${dataVariants.variant[0].name}.`
        }
        return `${dataVariants.variant[0].attributeValue.length} ${dataVariants.variant[0].name}, ${dataVariants.variant[1]?.attributeValue.length} ${dataVariants.variant[1]?.name}.`
    }, [dataVariants])

    const desktop = useMediaQuery('(min-width: 1024px)')

    return (
        <div className="flex flex-col">
            {firstAttribute.length > 0 &&
                <>
                    {desktop ?
                        <HeaderOptions
                            title={`${dataVariants.variant[0].name}:`}
                            value={dataVariants.selectVariant?.attribute_value_name}
                        />
                        :
                        <HeaderOptions
                            title={`Variants available:`}
                            value={headerVariantMobile}
                        />
                    }

                    <ul className={`my-0 mx-0 pt-0 px-0 flex overflow-x-auto screen-tm1-lg:flex-wrap space-x-2`}>
                        {firstAttribute.map((item, i) => {
                            return (
                                <li key={i}>
                                    <ButtonVariant
                                        image={item.image}
                                        name={item.name}
                                        onClick={() => clickFirstAttribute(item.name)}
                                        isActive={dataVariants.selectVariant?.attribute_value_name === item.name}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
            {secondAttribute.length > 0 &&
                <div className="hidden screen-tm1-lg:block">
                    <HeaderOptions
                        title={`${dataVariants.variant[1].name}:`}
                    />
                    <ul className="my-0 mx-0 pt-0 px-0 flex flex-wrap space-x-2">
                        {secondAttribute.map((item, i) => {
                            return (
                                <li key={i}>
                                    <ButtonVariant
                                        image={item.image}
                                        name={item.name}
                                        onClick={() => clickSecondAttribute(item.name)}
                                        isActive={dataVariants.selectVariant?.attribute_value_second_name === item.name}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}