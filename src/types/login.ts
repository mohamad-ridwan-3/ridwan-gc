export type DataLoginResultT = {
    access_token: string
    expires_in: number
    token_type: string
}

export type LoginResultT = {
    data: DataLoginResultT | null
    message: string
    result: boolean
}