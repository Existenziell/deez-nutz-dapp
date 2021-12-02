import Image from 'next/image'

const Social = () => {

  return (
    <div className='flex items-center justify-center mt-8'>
      <a href="https://discord.gg/jQfsCVjE" target="_blank" rel="noopener noreferrer nofollow" className='hover:shadow p-4'>
        <Image src="/social/discord.png" alt="Discord" height={50} width={50} />
      </a>
      <a href="https://twitter.com/deeznutz" target="_blank" rel="noopener noreferrer nofollow" className='hover:shadow p-4'>
        <Image src="/social/twitter.png" alt="Twitter" height={40} width={40} />
      </a>
    </div>
  )
}

export default Social
