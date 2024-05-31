export type CartsT = {
    cart_id: number
    image: string
    name: string
    price: {
        discount: string | number | null
        discount_int: string | number | null
        normal: string
        normal_int: number
    }
    product_id: number
    quantity: number
    stock: number
    total: string
    total_int: number
    variant: string
    weight: number
    slug: string
}

// add to cart
export type ReqAddToCartDataT = {
    item_id: number
    quantity: number
}

export type ResultAddToCartT = {
    result: true
    message: string
    data: null
}

// get list cart
export type DataListCartT = {
    carts: CartsT[]
    subtotal: string
    subtotal_int: number
    totalQty: number
    weight: number
}

export type ResultGetListCartT = {
    result: boolean
    message: string
    data: DataListCartT
}

// delete cart item
export type ReqDeleteCartItemT = {
    cart_id: number
    quantity: number
}

export type ResultDeleteCartItemT = {
    result: boolean
    message: string
    data: null
}