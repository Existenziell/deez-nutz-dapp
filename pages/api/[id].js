import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

  const {
    query: { id },
  } = req

  const { db } = await connectToDatabase()
  const nfts = await db
    .collection("nfts")
    .find()
    .toArray()

  let nft = nfts.filter((n) => `${n.edition}` === id)[0]
  res.status(200).json(nft)
}
