import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const links = [
    { name: 'NFTs', path: '/' },
    // { name: 'Mint', path: '/mint' },
    { name: 'Presale', path: '/presale' },
    { name: 'Team', path: '/team' },
    // { name: 'Collection', path: '/collection' },
    // { name: 'Roadmap', path: '/roadmap' },
    { name: 'Perks', path: '/perks' },
  ]

  return (
    <nav className='absolute z-10 flex pl-8 '>
      {links.map(l => {
        return (
          <Link href={l.path} key={l.name}>
            <a className={`text-lg text-white hover:bg-brand transition-all px-4 py-2 hover:shadow ${router.pathname === l.path ? 'active' : ''}`}>
              {l.name}
            </a>
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
