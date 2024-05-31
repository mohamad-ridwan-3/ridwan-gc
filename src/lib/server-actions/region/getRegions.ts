'use server'

export default async function getRegions(
    params: 'region.json' | 'state.json' | 'district.json'
):Promise<any>{
    const response = await fetch(`https://api.country.realm.chat/${params}`, {
        cache: 'no-store',
    })
    const result = await response.json()
    return result
}