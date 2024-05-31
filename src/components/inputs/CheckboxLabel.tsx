import { Checkbox, Typography } from "@material-tailwind/react";
import { ChangeEvent } from "react";

type Props = {
    label?: string
    checked?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>)=>void
    labelClassName?: string
}

export default function CheckboxLabel({
    label,
    checked,
    onChange,
    labelClassName = 'text-black font-inter font-normal mb-0'
}: Props) {
    return (
        <>
            <Checkbox
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
                checked={checked}
                onChange={onChange}
                label={
                    <Typography
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        placeholder=""
                        className={labelClassName}
                    >
                        {label}
                    </Typography>
                }
                ripple={true}
                className="text-black"
                iconProps={{
                    className: 'text-sm'
                }}
                containerProps={{
                    className: 'ml-[-11px]'
                }}
            />
        </>
    )
}