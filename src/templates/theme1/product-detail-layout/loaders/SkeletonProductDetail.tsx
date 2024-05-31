import AddToCart from "./AddToCart";
import ProductContent from "./ProductContent";
import ProductPreview from "./ProductPreview";

type Props = {
    classButton?: string
}

export default function SkeletonProductDetailTheme1({
    classButton
}: Props) {
    return (
        <div className="grid grid-cols-1 screen-tm1-sm:grid-cols-4 gap-4 screen-tm1-sm:gap-8 pb-8 pt-8 animate-pulse">
            {/* preview */}
            <ProductPreview/>
            <ProductContent/>
            <AddToCart classButton={classButton}/>
        </div>
    )
}