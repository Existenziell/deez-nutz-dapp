const Collection = () => {

  const [mintedNfts, setMintedNfts] = useState([])
  const [revealing, setRevealing] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    revealMintedNfts()
  }, [])

  async function revealMintedNfts() {
    // Hide if already revealed
    if (revealed) {
      setRevealed(false)
      return
    }
    setRevealing(true)
    const mintedNfts = []
    for (let i = 1; i <= contractInfo.totalSupply; i++) {
      const meta = await axios.get(`${contractInfo.baseUri}${i}`)
      mintedNfts.push(meta)
    }

    await setMintedNfts(mintedNfts)
    setRevealing(false)
    setRevealed(true)
  }

  return (
    <div>
      {/* <span onClick={revealMintedNfts} className="block text-brand cursor-pointer">
{revealed ? `[Hide minted Tokens]` : `[Reveal minted Tokens]`}
</span>

{revealing &&
<span className="block mt-8 h-8">
  <ClimbingBoxLoader color={"var(--color-brand)"} loading={revealing} size={10} />
</span>
} */}

      <h2 className="text-center">Minted NFTs:</h2>
      <ul className='flex flex-wrap justify-center items-center p-8 w-screen'>
        {mintedNfts.map(n => {
          const { edition, name, description, image, date, dna } = n.data
          return (
            <li key={edition} className="mb-16 mr-6 text-center">
              <Image src={image.toString()} width={200} height={200} alt={description} />
              <div className='mt-2 dark:text-white'>
                <h2 className="text-2xl">{name}</h2>
                {/* <p className="text-xs">Created: {convertTimestamp(date)}</p> */}
                <p className="text-xs">DNA: {dna}</p>
                {/* <p>{nft.description}</p> */}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Collection
