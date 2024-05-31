export type ListCollectionT = {
    name: string
    path: string
    collection?: {
        name: string
        path: string
    }[]
}

export type ListMenuT = {
    path: string
    name: string
    collection?: ListCollectionT[]
}

export type ProfileMenuItemsT = {
    label: string
    icon: string
    name: string
    slug?: string
}

// collections
export type CategoriesT = {
    name: string
    slug: string
    image: string | null
    title: string | null
    description: string
}
export type CategoriesCollectionT = CategoriesT & {
    subcategories: CategoriesT[]
}
export type DataCollectionsT = CategoriesT & {
    categories: CategoriesCollectionT[]
}

export type ResultCollectionsT = {
    result: boolean
    message: string
    data: DataCollectionsT[]
}