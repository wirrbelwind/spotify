import axios, { AxiosError } from 'axios'
import { refreshTokens } from '@/entities/user/model/refreshTokens'
// import { authService } from '@/entities/user';
import { AUTH_API_URL } from './constants'
import { authenticationActions } from '@/entities/user'

export const spotifyAxios = axios.create()

spotifyAxios.interceptors.request.use(async (config) => {
  const isAuthRequest = config.baseURL === AUTH_API_URL

  if (isAuthRequest) {
    return config
  }

  if (!(await authenticationActions.checkTokens())) {
    throw new Error('no tokens')
  }

  const now = Date.now()

  const accessTokenExpiration = await authenticationActions.getAccessTokenExpiration()
  if (accessTokenExpiration! <= now) {
    await refreshTokens()
  }

  config.headers.Authorization = `Bearer ${await authenticationActions.getAccessToken()}`

  return config
})

spotifyAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async (responseError: AxiosError) => {
    try {
      if (responseError.status === 401) {
        await refreshTokens()
        return spotifyAxios(responseError.request)
      }

      throw responseError
    } catch {
      throw responseError
    }
  },
)
