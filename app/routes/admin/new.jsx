import { Form, redirect, useActionData, useTransition } from "remix";
import { createPost, validatePost } from "~/posts";

export let action = async ({ request }) => {
    await new Promise(res => setTimeout(res, 3000));
  let formdata = await request.formData();
  let post = {
    title: formdata.get("title"),
    slug: formdata.get("slug"),
    markdown: formdata.get("markdown"),
  };

  let errors = validatePost(post)
  if (Object.keys(errors).length) {
    return errors;
  }
  await createPost(post);
  return redirect("/admin");
};

export default function NewPost() {
  let errors = useActionData();
  let transition = useTransition();
  return (
    <Form method="post">
      <div>
        <label>
          Post Title:
          {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </div>
      <div>
        <label>
          Post Slug:
          {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" />
        </label>
      </div>
      <div>
        <label htmlFor="markdown">Markdown</label>
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea rows={20} name="markdown" />
      </div>
      <div>
        <button disabled={transition.submission} type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </div>
    </Form>
  );
}
