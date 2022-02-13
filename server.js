import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
	generateIncomingFlight,
	generateOutcomingFlight,
} from './utils/index.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const data = []

setInterval(() => {
	const newFlight =
		new Date().getTime() % 2 === 0
			? generateIncomingFlight()
			: generateOutcomingFlight()
	data.push(newFlight)
}, 1000)

app.get('/Data', (_, res) => {
	res.json(data)
})

app.get('/CatFacts', async (_, res) => {
	const externalData = await (
		await fetch('https://cat-fact.herokuapp.com/facts')
	).json()
	console.log('server data', externalData)
	res.json(externalData)
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
