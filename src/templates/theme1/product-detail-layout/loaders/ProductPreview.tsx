export default function ProductPreview() {
    function loopCard(): number[] {
        let index: number[] = []
        for (let i = 0; i < 3; i++) {
            index.push(i)
        }
        return index
    }

    const totalData: number[] = loopCard()

    return (
        <div>
            <div className="screen-tm1-sm:sticky top-[80px]">
                <div className="h-[300px] screen-tm1-sm:h-[200px] screen-tm1-lg:h-[300px] w-full bg-gray-200"></div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                    {totalData.map((item, i)=>(
                        <div key={i} className="h-[80px] screen-tm1-sm:h-[50px] screen-tm1-lg:h-[80px] bg-gray-200"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}