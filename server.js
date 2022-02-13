// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/Data', (_, res) => {
	const data = [
		{
			time: '2022-02-13T10:19:19.881Z',
			flight: 'RU1234',
			origin: 'Moscow',
			destination: 'Saint-Petersburg',
			status: 'Landed',
			terminal: 'A1',
		},
		{
			time: '2022-02-13T10:19:19.882Z',
			flight: 'RU1234',
			origin: 'Moscow',
			destination: 'Saint-Petersburg',
			status: 'Landed',
			terminal: 'A1',
		},
		{
			time: '2022-02-13T10:19:19.883Z',
			flight: 'RU1234',
			origin: 'Moscow',
			destination: 'Saint-Petersburg',
			status: 'Landed',
			terminal: 'A1',
		},
		{
			time: '2022-02-13T10:19:19.884Z',
			flight: 'RU1234',
			origin: 'Moscow',
			destination: 'Saint-Petersburg',
			status: 'Landed',
			terminal: 'A1',
		},
		{
			time: '2022-02-13T10:19:19.885Z',
			flight: 'RU1234',
			origin: 'Moscow',
			destination: 'Saint-Petersburg',
			status: 'Landed',
			terminal: 'A1',
		},
	]

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
