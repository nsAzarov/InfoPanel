import { getRandomInt } from './getRandomInt.js'

export const generateDate = () => {
	return new Date(new Date().getTime() + getRandomInt(90) * 60000) // current date + (0-30) minutes
}
