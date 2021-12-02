import { connectToDatabase } from "../../lib/mongodb"
import sendMail from '../../lib/sendMail'

export default async (req, res) => {

  try {
    const { db } = await connectToDatabase()

    let data = { email: req.body }
    if (!data) {
      res.status(404).send(false)
      return
    }

    data.date = Date.now()
    db.collection('presale').insertOne({ ...data }, async function (error, response) {
      if (error) {
        res.status(404).send(false)
      } else {
        await sendMail(data)
        res.status(200).send(true)
      }
    })
  } catch (error) {
    res.status(404).send(false)
  }
}
