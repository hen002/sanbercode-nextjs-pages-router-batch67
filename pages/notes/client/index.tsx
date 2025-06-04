import useSWR from "swr"

type ListNotes = {
    id: number
    title: string
    description: string
    created_at: string
    updated_at: string

}

type Notes = {
    status: string
    message: string
    data: ListNotes[]
}


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoteClientPage() {
    const { data, isLoading, error } = useSWR(
        "https://service.pace11.my.id/api/notes",
        fetcher, {
        // revalidateOnFocus: true,
        refreshInterval: 3000,
    }
    )

    console.log('error', error);


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    return (
        <div className="grid grid-cols-4 gap-4">
            {data?.data.map((note: ListNotes) => (
                <div key={note.id} className="p-4 bg-white shadow-sm rounded-lg">
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                </div>
            ))}
        </div>
    )

}