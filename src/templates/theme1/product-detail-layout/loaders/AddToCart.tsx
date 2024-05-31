type Props = {
    classButton?: string
}

export default function AddToCart({
    classButton = 'w-[9rem]'
}: Props) {
    return (
        <div className="hidden screen-tm1-sm:block">
            <div className="flex screen-tm1-sm:sticky top-[80px] justify-end">
                <div className={`bg-gray-400 h-14 ${classButton}`}></div>
            </div>
        </div>
    )
}