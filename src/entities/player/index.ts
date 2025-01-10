export { usePlayer } from './model/_usePlayer'
import { shuffle } from './model/shuffle'
import { startAudio } from './model/startAudio'

export const playerServerActions = {
	startAudio,
	shuffle
}