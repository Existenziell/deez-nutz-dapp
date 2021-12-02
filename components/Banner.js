import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {

  return (
    <div className="image-wrapper w-full shadow-md">
      <Link href="/">
        <a>
          <Image src="/header.png" width={1920} height={1080} layout={"responsive"} alt={"DeezNutz Banner"} />
        </a>
      </Link>
    </div>
  )
}

export default Banner
