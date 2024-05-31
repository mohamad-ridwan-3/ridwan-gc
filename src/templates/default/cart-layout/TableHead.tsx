import { Typography } from "@material-tailwind/react"

export default function TableHead() {
    const tHead = [
        {
            name: 'Product'
        },
        {
            name: 'Quantity'
        },
        {
            name: 'Total'
        },
    ]

    return (
        <tr className="border-t border-b">
            {tHead.map((item, i) => (
                <th key={i} className="p-3">
                    <Typography
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        className="font-apple-system font-bold mb-0"
                    >
                        {item.name}
                    </Typography>
                </th>
            ))}
        </tr>
    )
}