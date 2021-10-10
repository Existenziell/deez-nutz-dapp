import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {

  return (
    <div className="image-wrapper w-screen shadow-md">
      <Link href="/">
        <a>
          <Image src="/banner.png" width={1000} height={300} layout={"responsive"} alt={"DeezNutz Banner"} />
        </a>
      </Link>
    </div>
  )
}

export default Banner
