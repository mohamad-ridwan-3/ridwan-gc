import ButtonClient from "@/src/lib/client/buttons/ButtonClient";
import ThemeProviderClient from "@/src/lib/client/theme/ThemeProviderClient";
import { Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useMediaQuery } from "usehooks-ts";
import ProductPreview from "./ProductPreview";
import { AttributeValueT, SelectVariantT, VariantsT } from "@/src/types/products";
import FirstAttribute from "./FirstAttribute";
import SecondAttribute from "./SecondAttribute";
import Iconify from "@/src/components/Iconify";

type Props = {
    handler: () => void
    selectVariant: SelectVariantT
    name: string
    variant: VariantsT[]
    clickVariant: (item: AttributeValueT) => void
    clickSecondVariant: (item: AttributeValueT) => void
    clickAddToCart: () => void
    loadingSubmit: boolean
}

export default function DetailVariants({
    handler,
    selectVariant,
    name,
    variant,
    clickVariant,
    clickSecondVariant,
    clickAddToCart,
    loadingSubmit
}: Props) {
    const desktop = useMediaQuery('(min-width: 1024px)')

    const customTheme = {
        dialog: {
            styles: {
                base: {
                    backdrop: {
                        placeItems: "place-items-end",
                        height: "h-full"
                    },
                    container: {
                        m: 'm-0',
                        borderRadius: "rounded-tl-lg rounded-tr-lg",
                    },
                },
                sizes: {
                    xs: {
                        width: "w-full",
                        minWidth: "",
                        maxWidth: "",
                    }
                }
            }
        }
    }

    return (
        <>
            {!desktop &&
                <ThemeProviderClient
                    value={customTheme}
                >
                    <Dialog
                        open={true}
                        handler={handler}
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        size="xs"
                        className="!max-h-[90vh] !m-0 flex flex-col"
                    >
                        <DialogHeader
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="flex flex-col items-start !px-0 pt-3 !pb-0"
                        >
                            <div className="flex items-center space-x-2 px-4">
                                <ButtonClient
                                    props={{
                                        variant: 'text',
                                        children: <></>,
                                        className: 'p-0',
                                        onClick: handler
                                    }}
                                >
                                    <Iconify
                                        icon="iconamoon:close-light"
                                    />
                                </ButtonClient>
                                <p className="!text-[16px] !font-inter">Product Variants</p>
                            </div>
                            <ProductPreview
                                selectVariant={selectVariant}
                                name={name}
                            />
                        </DialogHeader>
                        <div className="flex flex-col max-h-[768px] overflow-y-auto">
                            <FirstAttribute
                                selectVariant={selectVariant}
                                dataVariant={variant[0].attributeValue}
                                clickVariant={clickVariant}
                            />
                            {variant[1] &&
                                <SecondAttribute
                                    selectVariant={selectVariant}
                                    dataVariant={variant[1].attributeValue}
                                    clickVariant={clickSecondVariant}
                                />
                            }
                        </div>
                        <DialogFooter
                            placeholder=""
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                            className="shadow-[rgba(60,60,60,0.2)_0px_-3px_3px_0px] px-4 space-y-1 py-3"
                        >
                            <ButtonClient
                                title="Add To Cart"
                                props={{
                                    children: <></>,
                                    className: 'w-full justify-center',
                                    onClick: clickAddToCart,
                                    disabled: loadingSubmit || selectVariant?.quantity === 0,
                                    loading: loadingSubmit
                                }}
                            />
                            {selectVariant?.quantity === 0 &&
                                <p className="text-red-600 font-inter text-[11px] text-end font-semibold">
                                    Oops, this item is out of stock. <span className="font-normal">Please choose another item..</span>
                                </p>
                            }
                        </DialogFooter>
                    </Dialog>
                </ThemeProviderClient>
            }
        </>
    )
}