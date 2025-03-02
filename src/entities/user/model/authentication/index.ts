import { getAccessToken } from './access-token/getAccessToken'
import { getAccessTokenExpiration } from './access-token/getAccessTokenExpiration'
import { setAccessToken } from './access-token/setAccessToken'
import { setAccessTokenExpiration } from './access-token/setAccessTokenExpiration'
import { getAttemptedPage } from './attemped-page/getAttempedPage'
import { setAttemptedPage } from './attemped-page/setAttempedPage'
import { checkTokens } from './checkTokens'
import { getRefreshToken } from './refresh-token/getRefreshToken'
import { setRefreshToken } from './refresh-token/setRefreshToken'
import { getAuthenticationState } from './state/getAuthenticationState'
import { setAuthenticationState } from './state/setAuthenticationState'

export const authenticationActions = {
  checkTokens,

  getAccessToken,
  setAccessToken,

  getAccessTokenExpiration,
  setAccessTokenExpiration,

  getRefreshToken,
  setRefreshToken,

  getAuthenticationState,
  setAuthenticationState,

  getAttemptedPage,
  setAttemptedPage,
}
