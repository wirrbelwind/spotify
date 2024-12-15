//TODO: handle callback from spotify auth
export const GET = (request: Request) => {
	const url = new URL(request.url)
	return Response.json({url})
}