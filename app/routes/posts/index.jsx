import { Link } from "react-router-dom";
import { useLoaderData } from "remix"
import { getPosts } from "~/posts";


export let loader = async () => {
    return getPosts()
}   

export default function Posts() {
    let posts = useLoaderData();
    return (
        <div>
            <h3>Posts</h3>
            <ul>
                {posts.map(p => (
                    <li key={p.slug}>
                        <Link to={`/posts/${p.slug}`}>{p.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}