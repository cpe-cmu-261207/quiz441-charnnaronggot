import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { body, query, validationResult } from 'express-validator'
import fs from 'fs'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"

interface JWTPayload {
  username: string;
  password: string;
}
interface DbSchema {
  users: User[]
}

interface User {
  password : string
  username: string
  firstname : string 
  lastname : string 
  balacne : number
}

type RegisterArgs = Omit<User, 'id'>

type LoginArgs = Pick<JWTPayload, 'username' | 'password'>


app.post<any, any, LoginArgs>('/login', (req, res) => {

  const { username, password } = req.body

  const body = req.body
  const raw = fs.readFileSync('db.json', 'utf8')
  const db: DbSchema = JSON.parse(raw)
  const user = db.users.find(user => user.username === body.username)
  if (!user) {
    res.status(400)
    res.json({ message: 'Invalid username or password' })
    return
  }
  if (!bcrypt.compareSync(body.password, user.password)) {
    res.status(400)
    res.json({ message: 'Invalid username or password' })
    return
  }

  

})

app.post('/register',
  (req, res) => {

    const { username, password, firstname, lastname, balance } = req.body  
  })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
  
    }
    catch (e) {
  
      return  res.status(401).json({
        message: 'Invalid token'
      })
      //response in case of invalid token
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {

    //Is amount <= 0 ?
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ message: "Invalid data" })
  })

app.post('/withdraw',
  (req, res) => {
  })

app.delete('/reset', (req, res) => {

  //code your database reset here
  
  return res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  res.status(200).json({firstname: 'charnnarong'})
  res.status(200).json({lastname: 'charoensanongkun'})
  res.status(200).json({code: '620612146'})
  res.status(200).json({gpa: '4.5'})
})

app.get('/demo', (req, res) => {
  return res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

function SECRET_KEY(arg0: { username: string }, SECRET_KEY: any) {
  throw new Error('Function not implemented.')
}
