import { cities, terminals } from '../data/index.js'
import { generateDate } from './generateDate.js'
import { getRandomInt } from './getRandomInt.js'
import { v4 as uuidv4 } from 'uuid'

export const generateOutcomingFlight = (time) => {
	return {
		id: uuidv4(),
		time: generateDate(time),
		incoming: false,
		outcoming: true,
		flight: getRandomInt(9999).toString(),
		capacity: 100,
		origin: undefined,
		destination: cities[getRandomInt(cities.length)],
		status: 'In Airport',
		terminal: terminals[getRandomInt(terminals.length)],
	}
}
