type PropsContent = {
    content: string
}

export default function Content({ content }: PropsContent) {
    return <div dangerouslySetInnerHTML={{ __html: content }} className="text-[#737373] font-inter">

    </div>
}