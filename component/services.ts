import OpenAI from "openai";


export async function aiService(content: string, apiKey: string) {
    async function sendMsgToOpenAI(message: any) {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });
        const res = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Summarize texts to use as a Tweet, speak from first person as the user does. MAXIMUM 280 TOKENS/CHARACTERS."
                },
                {
                    role: "user",
                    content: `Please summarize this text so I can use it as a Tweet: "${message}". MAXIMUM 280 CHARACTERS/TOKENS. speak from first person as the user does.`
                }
            ],
            model: "gpt-3.5-turbo-0125",
            max_tokens: 280
        });
        return res.choices[0].message.content;
    }
    try {
        const body = await sendMsgToOpenAI(content)
        console.log(body)
        //max of 280 characters
        return new Response(JSON.stringify( { status: 200, body: body } ))
    } catch(error) {
        return new Response(JSON.stringify( { error: error, body: "Error" } ))
    }
}