import Image from 'next/image'
import Main from "../components/Main"
import Social from '../components/Social'

const Team = () => {
  return (
    <Main title='Team' titleSuffix={true}>
      <h1 className='text-white'>Team</h1>
      <Social />

      <ul className="my-16 flex items-start justify-center text-center text-sm space-x-8 dark:text-white">
        <li className="w-1/3">
          <Image src="/team/leon.png" width={200} height={200} alt="leon" />
          <h2>L</h2>
          <p>Founder<br />Mastermind<br />Meme hunter</p>
        </li>
        <li className="w-1/3 hover:border-2 hover:shadow">
          <Image src="/team/jonny.png" width={200} height={200} alt="jonny" />
          <h2>J</h2>
          <p>Artist<br />Sincerely gifted<br />Best looking of the team</p>
        </li>
        <li className="w-1/3">
          <Image src="/team/chris.png" width={200} height={200} alt="chris" />
          <h2>C</h2>
          <p>Blockchain guy<br /> MJ fueled<br />Not your typical nerd</p>
        </li>
      </ul>

    </Main>
  )
}

export default Team
