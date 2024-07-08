export async function fetchMarkdown(slug, host) {
    const query = `#graphql
		query Publication($slug: String!, $host: String!) { 
			publication(host: $host){
				post(slug: $slug){
                    title
					content {
						markdown
					}
				}
			}
		}
	`
    const variables = {
        slug,
        host,
    }

    const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
    })
    const { data } = await res.json()

    const title = data.publication.post.title
    const markdown = data.publication.post.content.markdown

    return { title, markdown }
}
