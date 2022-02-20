import { cities, terminals } from '../data/index.js'
import { generateDate } from './generateDate.js'
import { getRandomInt } from './getRandomInt.js'
import { v4 as uuidv4 } from 'uuid'

export const generateIncomingFlight = (time) => {
	return {
		id: uuidv4(),
		time: generateDate(time),
		incoming: true,
		outcoming: false,
		flight: getRandomInt(9999).toString(),
		origin: cities[getRandomInt(cities.length)],
		destination: undefined,
		status: 'In Flight',
		terminal: terminals[getRandomInt(terminals.length)],
	}
}
