import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

const formSchema = z.object({
    title: z.string().min(1, 'title wajib diisi!'),
    description: z.string().min(1, 'description wajib diisi!'),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ errorMessage: 'Method not allowed' })
    }
    try {
        const validateData = formSchema.parse(req.body)
        const response = await fetch(`${process.env.API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validateData)
        }).then((res) => res.json())

        if (response.status === "Created") {
            res.status(201).json(response)
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = Object.keys(error.formErrors.fieldErrors)?.reduce((acc, key) => {
                acc[key] = error.formErrors.fieldErrors[key]?.[0] || "Unknown error"
                return acc
            },
                {} as Record<string, string>,
            )
            return res.status(400).json({ errors })
        }

        return res.status(500).json({ message: "Internal server error" })

    }
}