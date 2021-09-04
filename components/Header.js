import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Header({ reset }) {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-5 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Cards</span>
                <FontAwesomeIcon icon={faPaw} className="h-8 w-auto" />
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}
