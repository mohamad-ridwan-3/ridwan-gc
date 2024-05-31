import { ChangeEvent } from "react";
import { Button } from "@material-tailwind/react";
import TypographyClient from "@/src/lib/client/typography/TypographyClienct";
import ProductInfo from "./ProductInfo";
import InputQuantity from "./InputQuantity";

type PropsDesc = {
    desc: string
}

type Props = {
    image?: string
    variant?: string
    stock: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    clickMinus: () => void
    clickPlus: () => void
    errMessage?: string
    have_attribute: boolean
    subtotal: string
    isDisabledBtnMinus?: boolean
    isDisabledBtnPlus?: boolean
    clickAddToCart: () => void
    errResponseAddToCart?: string
    isDisabledBtnAddToCart?: boolean
    productName: string
    loadingSubmit?: boolean
} & PropsDesc

function Description({ desc }: PropsDesc) {
    return <div dangerouslySetInnerHTML={{ __html: desc }} className="text-[#737373] font-inter">

    </div>
}

export default function AddToCart({
    image,
    variant,
    stock,
    onChange,
    value,
    clickMinus,
    clickPlus,
    errMessage,
    have_attribute,
    subtotal,
    isDisabledBtnMinus,
    isDisabledBtnPlus,
    clickAddToCart,
    errResponseAddToCart,
    isDisabledBtnAddToCart,
    desc,
    productName,
    loadingSubmit
}: Props) {
    return (
        <div className="hidden screen-tm1-lg:block">
            <div className="flex flex-col screen-tm1-sm:sticky top-[80px] border-gray-300 border rounded-md py-4 px-3">
                <div className="space-y-4">
                    <TypographyClient
                        title="Set quantity"
                        props={{
                            children: <></>,
                            as: 'h1',
                            className: 'font-inter font-semibold text-md'
                        }}
                    />
                    {have_attribute &&
                        <ProductInfo
                            image={image}
                            variant={variant}
                            productName={productName}
                        />
                    }
                </div>

                <div className="space-y-4 py-4">
                    <InputQuantity
                        stock={stock}
                        value={value}
                        onChange={onChange}
                        clickMinus={clickMinus}
                        clickPlus={clickPlus}
                        errMessage={errMessage}
                        isDisabledBtnMinus={isDisabledBtnMinus}
                        isDisabledBtnPlus={isDisabledBtnPlus}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <TypographyClient
                        title="Subtotal"
                        props={{
                            children: <></>,
                            className: 'font-inter text-[#737373] text-sm font-normal'
                        }}
                    />
                    <TypographyClient
                        title={subtotal}
                        props={{
                            children: <></>,
                            className: 'font-inter text-[#171717] text-sm font-bold'
                        }}
                    />
                </div>
                <div className="mt-3">
                    {errResponseAddToCart &&
                        <TypographyClient
                            title={errResponseAddToCart}
                            props={{
                                children: <></>,
                                className: 'text-sm font-inter text-red-600 font-normal text-start'
                            }}
                        />
                    }
                    <Button
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        className="rounded-md shadow-none w-full normal-case font-inter font-medium text-[16px] hover:opacity-[0.95] py-3 px-6 mt-2 justify-center"
                        size="lg"
                        disabled={isDisabledBtnAddToCart || stock == '1'}
                        onClick={clickAddToCart}
                        loading={loadingSubmit}
                    >
                        Add to cart
                    </Button>
                </div>
            </div>

            <div className="mt-8 text-left text-sm font-apple-system tracking-wide flex screen-tm1-lg:hidden">
                <Description desc={desc} />
            </div>
        </div>
    )
}