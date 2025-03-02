import { handleAuthCallback } from '@/entities/user/model/handleAuthCallback'

export const GET = async (request: Request) => {
  await handleAuthCallback(request)
}
