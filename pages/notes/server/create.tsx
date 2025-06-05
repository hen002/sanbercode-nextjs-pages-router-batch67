import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function NoteServerCreate() {
    const router = useRouter();

    const [payload, setPayload] = useState<{
        title: string;
        description: string;
    }>({
        title: "",
        description: ""
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        errors: { [key: string]: string }
    } | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData);
            } else {
                const data = await response.json();
                console.log(data);
                router.push("/notes/server");
            }
        } catch (err) {
            console.error("An Unexpected error occurred:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={payload.title}
                        onChange={(event) => setPayload({ ...payload, title: event.target.value })}
                        placeholder="Input title"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {error && typeof error === "object" && error.errors && (
                        <small className="text-red-600">{error.errors.title}</small>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={payload.description}
                        onChange={(event) => setPayload({ ...payload, description: event.target.value })}
                        placeholder="Input description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {error && typeof error === "object" && error.errors && (
                        <small className="text-red-600">{error.errors.description}</small>
                    )}
                </div>
                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}