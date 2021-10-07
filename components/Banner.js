import Image from 'next/image'

const Banner = () => {

  return (
    <div className="image-wrapper w-screen shadow-md">
      <Image src="/banner.png" width={1000} height={300} layout={"responsive"} alt={"DeezNutz Banner"} />
    </div>
  )
}

export default Banner
