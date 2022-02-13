import { cities, terminals } from '../data/index.js'
import { generateDate } from './generateDate.js'
import { getRandomInt } from './getRandomInt.js'

export const generateOutcomingFlight = () => {
	return {
		time: generateDate(),
		incoming: false,
		outcoming: true,
		flight: getRandomInt(9999).toString(),
		origin: undefined,
		destination: cities[getRandomInt(cities.length)],
		status: 'In Flight',
		terminal: terminals[getRandomInt(terminals.length)],
	}
}
