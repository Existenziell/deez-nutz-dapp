import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {

  const router = useRouter()
  const links = [
    { name: 'NFTs', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Perks', path: '/perks' },
  ]

  return (
    <nav className="flex pl-8 mt-4">
      {links.map(l => {
        return (
          <Link href={l.path} key={l.name}>
            <a className={`mr-4 text-brand ${router.pathname == l.path ? "active" : ""}`}>
              {l.name}
            </a>
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
