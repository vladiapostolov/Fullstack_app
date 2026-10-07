import { useParams } from "react-router-dom";
import noteServices from "../services/noteServices";
import { useQuery } from "@tanstack/react-query";

const Note = () => {
    let params = useParams();

    const { data, error }  = useQuery({
        queryKey: ['notes', params.id],
        queryFn: () => noteServices.getNote(params.id),
        refetchOnWindowFocus: false
    })

    if(error){
        return <div>Error fetching data</div>
    }

    return (
        <>
        <p>Note with {params.id} id has the following data:</p>
        <br/>
        {data && <p>{data.content} and importance: {data.important}</p>}
        </>
    )
}

export default Note;