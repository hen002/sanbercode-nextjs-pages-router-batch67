import { GetStaticProps, InferGetStaticPropsType } from "next"


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
    data: ListNotes
}

export const getStaticPaths = (async () => {
    const notes = await fetch("https://service.pace11.my.id/api/notes",
    ).then(
        (res) => res.json(),
    )
    const paths = notes.data.map((note: ListNotes) => ({
        params: { id: note.id.toString() }, // convert id to string
    }))
    return {
        paths,
        fallback: 'blocking',
    }

})

export const getStaticProps = (async (context) => {
    const { params } = context
    const notes = await fetch(`https://service.pace11.my.id/api/note/${params?.id || ''}`,
    ).then(
        (res) => res.json(),
    )

    return { props: { notes }, revalidate: 3 }
}) satisfies GetStaticProps<{ notes: Notes }>

export default function NotesServerPage({ notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className="p-4 bg-white shadow-sm rounded-lg">
            <h1>{notes.data.title}</h1>
            <p>{notes.data.description}</p>
        </div>
    )

}