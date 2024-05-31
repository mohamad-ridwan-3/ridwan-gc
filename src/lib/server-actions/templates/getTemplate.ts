import { TemplateDirT } from "@/src/types/template";
import { headers } from "next/headers";

export async function getTemplate(): Promise<TemplateDirT & {
    hostname: string,
    isDomainAccess?: boolean | null
}> {
    const headersList = headers();
    const hostname = headersList.get('x-forwarded-host')

    const response = await fetch(`${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/test.php`, {cache: 'no-store'})
    if (!response.ok) {
        return {
            templateDir: 'failed',
            hostname: hostname as string
        }
    }

    const result = await response.json()
    return {
        templateDir: result[0].templateDir,
        hostname: hostname as string
    }
}