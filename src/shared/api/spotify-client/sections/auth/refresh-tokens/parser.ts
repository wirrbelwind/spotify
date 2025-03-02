import { tokensSchema } from '../../../schemas/tokens'

export const getParser = () => {
  return tokensSchema.omit({ refresh_token: true })
}
