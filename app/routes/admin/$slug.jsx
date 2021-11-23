import { useLoaderData } from "remix";

export let loader = ({ params }) => {
    return params.slug;
}

export default function EditPost() {
    const slug = useLoaderData()
    return (
        <div>
            <h3>Editing {slug}...</h3>
        </div>
    )
}