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

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let data = []

const generateFlight = () => {
	const newFlight =
		new Date().getTime() % 2 === 0
			? generateIncomingFlight()
			: generateOutcomingFlight()
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
	generateFlight()
	res.json('ok')
})

app.post('/LandingFlightData', async (req, res) => {
	logReq('LandingFlightData', req.body.flight)
	try {
		const externalData = await (
			await fetch('http://localhost:4001/LandingFlightData', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(req.body),
			})
		).json()
		logRes('LandingFlightData', externalData)
		updateFlightInDB(externalData)
		res.json(externalData)
	} catch (e) {
		logErr('something went wrong during "/LandingFlightData"')
		res.json(req.body.flight)
	}
})

app.post('/TakingOffFlightData', async (req, res) => {
	logReq('TakingOffFlightData', req.body.flight)
	try {
		const externalData = await (
			await fetch('http://localhost:4001/TakingOffFlightData', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(req.body),
			})
		).json()
		logRes('TakingOffFlightData', externalData)
		updateFlightInDB(externalData)
		res.json(externalData)
	} catch (e) {
		logErr('something went wrong during "/TakingOffFlightData"')
		res.json(req.body.flight)
	}
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
