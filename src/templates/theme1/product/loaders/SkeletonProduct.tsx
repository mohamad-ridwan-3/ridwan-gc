import CardProduct from "./CardProduct";

type Props = {
    total: number
}

export default function SkeletonProductTheme1({
    total
}: Props) {
    return (
        <div className="grid grid-cols-2 screen-tm1-sm:grid-cols-4 screen-tm1-lg:grid-cols-6 gap-8 pt-8">
            <CardProduct total={total}/>
        </div>
    )
}