export type DataResultRegistrationT = {
    created_at: string
    email: string
    id: number
    name: string
    phone: string
    updated_at: string
}

export type ResultRegistrationT = {
    data: DataResultRegistrationT
    message: string
    result: boolean
}