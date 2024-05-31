// from product list
export type ProuductT = {
    image: string
    name: string
    slug?: string
    sku?: string | number | number
    barcode?: string
    has_discount: boolean
    price: string
}

export type PaginationT = {
    total: number
    per_page: number
    current_page: number
    last_page: number
    from: number
}

export type ResultProductDataT = {
    result: boolean
    message: string
    data: {
        list: ProuductT[]
        pagination: PaginationT
    }
}

// from product detail
export type OnlyAttributeProductDetailT = {
    item_id: number
    price: string
    image: string
    attribute_name: string | null
    attribute_second_name: string | null
    attribute_value_name: string | null
    attribute_value_second_name: string | null
    quantity: number
}

export type OptionsAttributeProductDetailT = {
    name: string
    options: string[]
}

export type AttributeProductDetailT = {
    attribute: OnlyAttributeProductDetailT[]
    options: OptionsAttributeProductDetailT[]
}

export type ProductDetailDataT = {
    images: string[]
    name: string
    slug: string
    barcode: string
    sku: string | number | null
    price: string
    description: string
    short_description: string
    has_discount: boolean
    weight: number
    weight_unit: string
    meta_title: string | null
    meta_description: string | null
    custom_label: string | null
    have_attribute: boolean
    quantity?: number
    item_id?: number
    attribute: AttributeProductDetailT
}

export type ResultProductDetailT = {
    result: boolean
    message: string
    data: ProductDetailDataT
}

// data variants
export type AttributeValueT = {
    name: string
    image: string
    stock?: number
}

export type VariantsT = {
    name: string
    value: string
    attributeValue: AttributeValueT[]
}

export type SelectVariantT = {
    attribute_name: string
    attribute_second_name: string | null
    attribute_value_name: string
    attribute_value_second_name: string | null
    image: string
    item_id: number
    price: string
    quantity: number
}

export type DataVariantProductT = {
    variant: VariantsT[]
    selectVariant: SelectVariantT
}