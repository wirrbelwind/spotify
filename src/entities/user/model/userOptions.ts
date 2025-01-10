import { queryOptions } from "@tanstack/react-query"
import { getCurrentUser } from "@/entities/user/model/getCurrentUser"

export const userOptions = () => {
	return queryOptions({
		queryKey: ['me'],
		queryFn: getCurrentUser,
		staleTime: 1000 * 60 * 60 * 12, // 12 hours
	})
}
