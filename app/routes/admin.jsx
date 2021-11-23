import { useLoaderData, Outlet, NavLink } from "remix";
import { getPosts } from "~/posts";
import adminStyles from "~/styles/admin.css";

export let loader = () => {
  return getPosts();
};

export let links = () => [{ rel: "stylesheet", href: adminStyles }];

export default function AdminIndex() {
  const posts = useLoaderData();

  return (
    <div className="admin">
      <nav>
        Admin
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <NavLink to={p.slug}>{p.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main>
          <Outlet />
      </main>
    </div>
  );
}
