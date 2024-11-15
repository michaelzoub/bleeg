import { useState, useEffect } from "react"
import { aiService } from "./services"

interface BleegProps {
    color: any,
    onClick: () => void,
    apiAI: string,
    consumerKey: string,
    consumerSecret: string, 
    accessToken: string, 
    tokenSecret: string
}

export default function Bleeg({color, onClick, apiAI, consumerKey, consumerSecret, accessToken, tokenSecret}: BleegProps) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [postPreview, setPostPreview] = useState("")

    useEffect(() => {
        if (!apiAI || !consumerKey || !consumerSecret || !accessToken || !tokenSecret) {

        }
    }, [apiAI, consumerKey, consumerSecret, accessToken, tokenSecret])

    async function handleSubmit() {
        if (!apiAI || !consumerKey || !consumerSecret || !accessToken || !tokenSecret) {
            
        }
        onClick() //User function 
        //Sends to AI, AI summarizes and Tweet gets posted:
        const summarizedContent = await aiService(description, apiAI)
        const parsedContent = await summarizedContent.json()
        const response = await fetch("/api/twitter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { parsedContent: parsedContent, consumerKey: consumerKey, consumerSecret: consumerSecret, accessToken: accessToken, tokenSecret: tokenSecret } )
        })
        console.log("twitter response: ", response)
    }

    return (
        <div className="my-6 text-black">
                <form className={`flex flex-col w-full`} onSubmit={handleSubmit}>
                    <input placeholder="Title" className="mx-auto p-1 px-2 shadow-inner border-2 rounded-lg border-gray-100 w-[350px] md:w-[550px]" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
                    <textarea placeholder="Content" className="mx-auto w-[350px] my-3 p-1 px-2 shadow-inner border-2 rounded-lg border-gray-100 h-56 resize-none md:w-[550px]" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                </form>
                <button onClick={handleSubmit} className={`bg-zinc-50 p-[5px] rounded-lg shadow-inner mx-auto w-[350px] md:w-[550px] transition delay-50 duration-300 ease-in-out hover:bg-zinc-100`}>Post</button>
                <div className="flex flex-col gap-2 w-[350px] my-1 md:w-[550px]">
                    <input placeholder="OpenAI API Key" className="w-full p-1 border-[3px] border-gray-100 rounded-lg shadow-inner"></input>
                    <div className="w-full flex flex-row gap-2">
                        <input placeholder="Twitter Consumer Key" className="w-full p-1 border-[3px] border-gray-100 rounded-lg shadow-inner"></input>
                        <input placeholder="Twitter Consumer Secret" className="w-full p-1 border-[3px] border-gray-100 rounded-lg shadow-inner"></input>
                    </div>
                    <div className="w-full flex flex-row gap-2">
                        <input placeholder="Twitter Access Token" className="w-full p-1 border-[3px] border-gray-100 rounded-lg shadow-inner"></input>
                        <input placeholder="Twitter Access Secret" className="w-full p-1 border-[3px] border-gray-100 rounded-lg shadow-inner"></input>
                    </div>
                </div>
                <h1 className="flex text-sm px-1 w-fit gap-1"><span className="text-orange-500">©</span>Bleeg</h1>
                <div className={`${postPreview ? "flex opacity-100 transition delay-50 duration-300 ease-in-out" : "absolute opacity-0 transition delay-50 duration-300 ease-in-out"}`}>
                    <div>Preview</div>
                    <div className="mx-auto w-[350px] my-3 p-1 px-2 shadow-inner border-2 rounded-lg border-gray-100 h-36 resize-none md:w-[550px]">{postPreview}</div>
                </div>
        </div>
    )
}