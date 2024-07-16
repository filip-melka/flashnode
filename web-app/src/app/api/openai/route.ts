import { Flashcard } from "@/lib/flashcardsContext"
import { OpenAI } from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

function getPrompt(title: string, markdown: string) {
    return `I have a markdown file containing a technical blog post. Please read the file and generate a set of questions and answers based on the content of the markdown file.

Example format:

Q: [Your question here]
A: [Your answer here]

Markdown file content:

# ${title}

${markdown}`
}

export async function POST(req: Request) {
    try {
        const { markdown, title } = await req.json()

        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: getPrompt(title, markdown),
                },
            ],
            max_tokens: 200,
        })

        const data = res.choices[0].message.content as string
        const finishReason = res.choices[0].finish_reason

        const pairs = data.split("\n\n")

        const flashcards: Flashcard[] = []

        pairs.forEach((pair) => {
            const q = pair.substring(3, pair.indexOf("A: "))
            const a = pair.substring(pair.indexOf("A: ") + 3)

            flashcards.push({
                front: q.trim(),
                back: a.trim(),
            })
        })

        // remove incomplete answer
        if (finishReason !== "stop") {
            flashcards.pop()
        }

        if (flashcards.length === 0) {
            return new Response(null, {
                status: 500,
                statusText: "No flashcards",
            })
        }

        return Response.json({ flashcards })
    } catch (error: any) {
        return new Response(null, {
            status: 500,
            statusText: error.message || "Something went wrong",
        })
    }
}
