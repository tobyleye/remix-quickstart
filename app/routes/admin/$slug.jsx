import { Form, useLoaderData, useTransition, redirect, useActionData } from "remix";
import { getPost, validatePost, updatePost } from "~/posts";

export let loader = ({ params }) => {
  return getPost(params.slug)
}

export let action = async  ({ request }) => {
    let formdata = await request.formData()

    let post = {
        title: formdata.get("title"),
        slug: formdata.get('slug'),
        markdown: formdata.get("markdown"),
    };

    let errors = validatePost(post)
    if (Object.keys(errors).length) {
      return errors;
    }

    await updatePost(post);

    return redirect('/admin')
}   

export default function EditPost() {
  const post = useLoaderData();

  let { title, slug, markdown} = post;
  console.log('submitting post:', post)
  let transition = useTransition()
  let errors = useActionData();

  return (
    <div>
      <h3>Editing {slug}...</h3>
      <Form method="post">
        <div>
          <label>
            Post Title:
            {errors?.title && <em>Title is required</em>}
            <input type="text" name="title" defaultValue={title}  />
          </label>
        </div>
        <div>
          <label>
            Post Slug:
            {errors?.slug && <em>Slug is required</em>}
            <input type="text" name="slug" defaultValue={slug} readOnly />
          </label>
        </div>
        <div>
          <label htmlFor="markdown">Markdown</label>
          {errors?.markdown && <em>Markdown is required</em>}
          <br />
          <textarea rows={20} name="markdown" defaultValue={markdown} />
        </div>
        <div>
          <button disabled={transition.submission} type="submit">
            {transition.submission ? "Editing..." : "Edit Post"}
          </button>
        </div>
      </Form>
    </div>
  );
}
