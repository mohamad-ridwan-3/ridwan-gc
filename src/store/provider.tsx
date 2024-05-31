'use client'

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from ".";
import { TemplateDirT } from "../types/template";
import { useAppDispatch } from "../hooks/redux";
import { addTemplate } from "./template/templateSlice";
import { addDomainAccess } from "./domain/domainSlice";
import { ResultCollectionsT } from "../types/navbar";
import { addCollections } from "./navbar/navbarSlice";

type Props = {
    children: ReactNode
    isDomainAccess?: boolean | null
    hostname: string
    collections: ResultCollectionsT
} & TemplateDirT

function SetTemplateName({
    children,
    templateDir,
    hostname,
    isDomainAccess,
    collections
}: Props) {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(templateDir){
            dispatch(addTemplate({templateName: templateDir}))
        }
    }, [templateDir])

    useEffect(()=>{
        if(isDomainAccess === false){
            dispatch(addDomainAccess({isDomainAccess}))
        }
    }, [isDomainAccess])
    useEffect(()=>{
        dispatch(addCollections(collections))
    }, [collections])
    return (
        <>
            {children}
        </>
    )
}

export default function StoreProvider({
    children,
    templateDir,
    hostname,
    isDomainAccess,
    collections
}: Props) {
    return (
        <Provider store={store}>
            <SetTemplateName
                templateDir={templateDir}
                hostname={hostname}
                isDomainAccess={isDomainAccess}
                collections={collections}
            >
                {children}
            </SetTemplateName>
        </Provider>
    )
}