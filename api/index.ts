import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}
  
const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/hotels', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM hotels").all()
  return c.json(results)
})
  
app.post('/api/hotels', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO hotels(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  const newHotel = await c.env.DB.exec(query)
  return c.json(newHotel)
})
  
app.get('/api/hotels/:id', async (c) => {
  const hotelId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM hotels WHERE id = ?').bind(hotelId).all()
  return c.json(results[0])
})

app.put('/api/hotels/:id', async (c) => {
  const hotelId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE hotels SET name = "${input.name}", place = "${input.place}", time = ${input.time} WHERE id = "${hotelId}"`
  const hotel = await c.env.DB.exec(query)

  return c.json(hotel)
})

app.delete('/api/hotels/:id', async (c) => {
  const hotelId = c.req.param('id')

  const query = `DELETE FROM hotels WHERE id = "${hotelId}"`
  const hotel = await c.env.DB.exec(query)

  return c.json(hotel)
})

export default app