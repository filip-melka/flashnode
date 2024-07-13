import { Flashcard } from "@/lib/flashcardsContext"
import { OpenAI } from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

function getPrompt(title: string, markdown: string) {
    return `I have a markdown file containing a technical blog post. Please read the file and generate a set of questions and their corresponding anser based on the content of the markdown file.

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

        /* const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: getPrompt(title, markdown),
                },
            ],
            max_tokens: 200,
        })

        console.log(JSON.stringify(res))

        const data = res.choices[0].message.content as string
        const finishReason = res.choices[0].finish_reason */

        const data = `Q: What is Test-Driven Development (TDD) and what are the main steps involved in the TDD cycle?
A: Test-Driven Development (TDD) is a development process where tests are written before the actual code. The main steps involved in the TDD cycle are:
1. Red: Write a test that fails.
2. Green: Write the minimum code needed to make the test pass.
3. Refactor: Improve the code while ensuring all tests still pass.

Q: How can you set up Jest and React Testing Library for a React project?
A: You can set up Jest and React Testing Library for a React project by either using Create React App (CRA) where Jest is included, or adding these dependencies using npm or yarn with 
the following command:
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
or
yarn add --dev jest @testing-library/react @testing-library/jest-dom

Q: What are some benefits of Test-Driven Development (TDD) in software development?
A: Some benefits of Test-Driven Development (TDD) in software development include improved code quality, less debugging time, better design decisions, and serving as documentation for 
code functionality.

Q: What are some tips for effectively implementing Test-Driven Development (TDD) in React applications?
A: Some tips for effectively implementing Test-Driven Development (TDD) in React applications include starting with small components, mocking external dependencies,`

        const finishReason: string = "length"

        const pairs = data.split("\n\n")

        const flashcards: Flashcard[] = []

        pairs.forEach((pair) => {
            console.log(pair)
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
