import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"

const getParser = () => currentUserSchema
// Or:
// const getParser = () => {
// 	// use some schema as a base
// 	currentUserSchema
// 	// omit some fields
// 	.omit({
// 		email: true,
// 		images: true
// 	})
// 	// add/override some fields
// 	.merge(z.object({
// 		additionalData: z.literal(true)
// 	}))
// }

export const getCurrentUserProfile = async () => {
	// define request url
	const url = '/me'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
	})

	const json = response.data
	const user = getParser().parse(json)
	
	return user
}
