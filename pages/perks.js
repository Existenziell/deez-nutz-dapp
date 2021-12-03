import Main from "../components/Main"
import Link from 'next/link'
const Perks = () => {
  return (
    <Main title='Perks' titleSuffix={true}>
      <section className="flex flex-col items-center text-center">
        <h1>Perks</h1>
        <p className="my-8 text-xl leading-normal md:w-1/2">
          Buying a DeezNutz NFT will grant you access to our impressive array of curated real-life perks, including exclusive access to mansions and yachts in the tropics.<br />
        </p>
        <p>
          More information coming very soon.<br />
          <Link href="/presale"><a className="underline">Register your email</a></Link> to get notified before we drop the Nutz!
        </p>
      </section>
    </Main>
  )
}

export default Perks
