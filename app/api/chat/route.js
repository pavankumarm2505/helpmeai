import {NextResponse} from 'next/server'
import OpenAI from 'openai-api'

const systemPrompt = `You are an AI-powered customer support specialist. You will be given a customer inquiry, and you must generate a detailed and helpful response`



export async function POST(req, res) {
    const openai = new OpenAI();
    const data = await req.json()

    const completion = await openai.chat.completions.create({

        messages : [{
            role: 'system',
            content: systemPrompt
        },
    ...data,],
    model: 'gpt-4o-mini',
    stream: true,
});

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder();
            try{
                for await (const chunk of completion){
                    const content= chunk.choices[0].delta?.content;
                    if(content){
                        const text = encoder.endcode(content);
                        controller.enqueue(text);
                    }
                }
            }
            catch(error){
                controller.error(error);
            }
            finally{
                controller.close();
            }
        }
        
    });
    return new NextResponse(stream);
}