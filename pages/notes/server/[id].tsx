import { GetServerSideProps, InferGetServerSidePropsType } from "next"


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

export const getServerSideProps = (async (context) => {
    const { params } = context
    const notes = await fetch(`https://service.pace11.my.id/api/note/${params?.id || ''}`,
    ).then(
        (rest) => rest.json(),
    )

    return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NotesServerPage({ notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="p-4 bg-white shadow-sm rounded-lg">
            <h1>{notes.data.title}</h1>
            <p>{notes.data.description}</p>
        </div>
    )

}