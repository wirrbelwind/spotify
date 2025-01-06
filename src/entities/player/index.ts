export { usePlayer } from './model/_usePlayer'
import { shuffleAction } from './model/actions/shuffleAction'
import { startAudioAction } from './model/actions/startAudioAction'

export const playerServerActions = {
	startAudioAction,
	shuffleAction
}