import { faPaw, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Header({ reset }) {
  return (
    <div className="relative mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-5 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="flex items-center font-black uppercase">
                <FontAwesomeIcon icon={faPaw} className="h-4 w-auto mr-2" />
                Cards
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            <button onClick={reset}>
              <FontAwesomeIcon icon={faUndo} className="h-4 w-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
