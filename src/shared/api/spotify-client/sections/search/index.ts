import { fetchSearch } from "./http-request";
import { queryOptions } from "./hook";
export type {SearchType} from './http-request'


export const search = {
    fetch: fetchSearch,
    queryOptions: queryOptions
}
