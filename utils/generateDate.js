import { getRandomInt } from './getRandomInt.js'

export const generateDate = (time) => {
	return new Date(new Date(time).getTime() + getRandomInt(40) * 60000) // current date + (0-90) minutes
}
