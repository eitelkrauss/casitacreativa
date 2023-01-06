export async function get({params, request}) {

    console.log(params, request)
    const id = params.id

    const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)).json();

    return {
        body: JSON.stringify({
            data: data
        })
    }
}


export function getStaticPaths() {
    return [
        {params: {id: '1'}},
        {params: {id: '2'}},
        {params: {id: '3'}},
    ]
}