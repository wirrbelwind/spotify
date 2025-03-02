import { usePlayerController } from '@/shared/providers/spotify-player'
import { useMutation } from '@tanstack/react-query'

export const useChangeVolume = () => {
  const controller = usePlayerController()

  return useMutation<unknown, unknown, { newValue: number }>({
    mutationKey: ['player', 'volume'],
    mutationFn: async ({ newValue }) => {
      if (!controller) {
        throw new Error('no controller')
      }

      await controller.setVolume(newValue)
    },
  })
}
