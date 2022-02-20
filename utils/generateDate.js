import { getRandomInt } from './getRandomInt.js'

export const generateDate = () => {
	return new Date(new Date().getTime() + getRandomInt(40) * 60000) // current date + (0-90) minutes
}
