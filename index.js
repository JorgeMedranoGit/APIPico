import express from 'express'
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.use(express.json())

// POST /lectures: recibe datos en body JSON
app.post('/lectures', async (req, res) => {
  const {
    data,
    id_sensor_assignment_crop,
    id_sensor_assignment_greenhouse,
    id_measurement_type
  } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO ambiental_lectures 
       (data, id_sensor_assignment_crop, id_sensor_assignment_greenhouse, id_measurement_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data, id_sensor_assignment_crop, id_sensor_assignment_greenhouse, id_measurement_type]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al insertar en la base de datos' })
  }
})

// GET /lectures: recibe datos en query string (URL)
app.get('/lectures', async (req, res) => {
  const {
    data,
    id_sensor_assignment_crop,
    id_sensor_assignment_greenhouse,
    id_measurement_type
  } = req.query

  try {
    const result = await pool.query(
      `INSERT INTO ambiental_lectures 
       (data, id_sensor_assignment_crop, id_sensor_assignment_greenhouse, id_measurement_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data, id_sensor_assignment_crop, id_sensor_assignment_greenhouse, id_measurement_type]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al insertar en la base de datos' })
  }
})

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`)
})
