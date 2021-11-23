import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import path from "path";
import showdown from "showdown"

let postsPath = path.resolve(__dirname, "../posts");

export async function getPost(slug) {
  let postPath = path.join(postsPath, slug + ".md");
  let file = await fs.readFile(postPath);
  let { attributes } = parseFrontMatter(file.toString());
  let converter = new showdown.Converter();

  return {
    slug: slug,
    title: attributes.title,
    html: converter.makeHtml(file.toString()),
  };
}

export async function createPost(post) {
    let md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
    await fs.writeFile(
        path.join(postsPath, post.slug + '.md'),
        md
    )
    return getPost(post.slug)
}

export async function getPosts() {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      let file = await fs.readFile(path.join(postsPath, filename));
      let { attributes } = parseFrontMatter(file.toString());
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}
