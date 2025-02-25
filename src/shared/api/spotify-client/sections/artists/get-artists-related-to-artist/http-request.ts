'use server'
import { AxiosError } from "axios"
import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"
import { notFound } from "next/navigation"

export interface GetArtistsRelatedToArtistArgs {
    artistId: string
}

export const fetchArtistsRelatedToArtist = async ({artistId}: GetArtistsRelatedToArtistArgs) => {
    const url = `/artists/${artistId}/related-artists`
    
    try {
        const response = await spotifyAxios.get(url, {
            baseURL: DATA_API_URL,
        })
    
        const json = response.data
        const artists = getParser().parse(json)
        return artists
    }
    catch(error){
        if(error.response.data.error.status === 404) {
            notFound()
        }
    }
}