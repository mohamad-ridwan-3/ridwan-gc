type PropsDesc = {
    desc: string
}

export default function Description({ desc }: PropsDesc) {
    return <div dangerouslySetInnerHTML={{ __html: desc }}>

    </div>
}