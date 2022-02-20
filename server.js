import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
	generateIncomingFlight,
	generateOutcomingFlight,
	logReq,
	logRes,
	logErr,
} from './utils/index.js'

const MODULE_NAME = 'INFO_PANEL'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let data = []

const generateFlight = (time) => {
	console.log('time', time)
	const newFlight =
		new Date().getTime() % 2 === 0
			? generateIncomingFlight(time)
			: generateOutcomingFlight(time)
	data.push(newFlight)
}

const updateFlightInDB = (updatedFlight) => {
	const newData = []
	data.forEach((flight) => {
		if (flight.id === updatedFlight.id) {
			newData.push(updatedFlight)
		} else {
			newData.push(flight)
		}
	})
	data = newData
}

app.get('/Data', (_, res) => {
	res.json(data)
})

app.post('/GenerateFlight', async (_, res) => {
	const { time } = await (
		await fetch('http://localhost:4003/Time', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ from: MODULE_NAME }),
		})
	).json()
	generateFlight(time)
	res.json('ok')
})

const sendUpdateIncomingFlightDataRequest = async (flight) => {
	try {
		logReq('LandingFlightData')
		const externalData = await (
			await fetch('http://localhost:4001/LandingFlightData', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(flight),
			})
		).json()
		logRes('LandingFlightData', externalData)
		updateFlightInDB(externalData)
	} catch (e) {
		logErr('something went wrong during "/LandingFlightData"')
	}
}
const sendUpdateOutcomingFlightDataRequest = async (flight) => {
	try {
		logReq('TakingOffFlightData')
		const externalData = await (
			await fetch('http://localhost:4001/TakingOffFlightData', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(flight),
			})
		).json()
		logRes('TakingOffFlightData', externalData)
		updateFlightInDB(externalData)
	} catch (e) {
		logErr('something went wrong during "/TakingOffFlightData"')
	}
}

const isDateEarlierThanXMinutes = (time, minutes) => {
	return new Date(new Date(time).getTime() - minutes * 60000) < new Date()
}

const updateIncomingFlightData = async (flight) => {
	if (flight.status === 'Landed') return
	if (
		flight.status === 'Landing' &&
		isDateEarlierThanXMinutes(flight.time, 2)
	) {
		await sendUpdateIncomingFlightDataRequest(flight)
	} else if (
		(flight.status === 'Descending' ||
			flight.status === 'Waiting for landing') &&
		isDateEarlierThanXMinutes(flight.time, 10)
	) {
		await sendUpdateIncomingFlightDataRequest(flight)
	} else if (
		flight.status === 'In Flight' &&
		isDateEarlierThanXMinutes(flight.time, 30)
	) {
		await sendUpdateIncomingFlightDataRequest(flight)
	}
}

const updateOutcomingFlightData = async (flight) => {
	if (flight.status === 'In Flight') return
	if (isDateEarlierThanXMinutes(flight.time, 0)) {
		await sendUpdateOutcomingFlightDataRequest(flight)
	}
}

setInterval(async () => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].incoming) {
			if (
				new Date(new Date(data[i].time).getTime() - 30 * 60000) < new Date()
			) {
				await updateIncomingFlightData(data[i])
			}
		} else if (data[i].outcoming) {
			if (
				new Date(new Date(data[i].time).getTime() - 30 * 60000) < new Date()
			) {
				await updateOutcomingFlightData(data[i])
			}
		}
	}
}, 2000)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
