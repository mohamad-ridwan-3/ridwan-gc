import ButtonClient from "@/src/lib/client/buttons/ButtonClient";

type Props = {
    handleMobileAddToCart: ()=>void
    loading: boolean
    isDisabled: boolean
}

export default function AddToCartMobile({
    handleMobileAddToCart,
    loading,
    isDisabled
}: Props){
    return(
        <div className="fixed bottom-0 left-0 right-0 py-3 px-8 bg-white flex screen-tm1-lg:hidden z-[999] shadow-[rgba(60,60,60,0.2)_0px_-3px_3px_0px]">
            <ButtonClient
                title="Add To Cart"
                props={{
                    children: <></>,
                    className: 'w-full',
                    onClick: handleMobileAddToCart,
                    disabled: loading || isDisabled,
                    loading: loading
                }}
            />
        </div>
    )
}