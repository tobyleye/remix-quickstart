import { useLoaderData } from "remix"
import { getPost } from "~/posts";

export let loader = async ({ params }) => {
   return getPost(params.slug)

}

export default function PostSlug() {
    const post = useLoaderData();

    return (
        <div>
            <h3>{post.title}</h3>
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
        </div>
    )
}