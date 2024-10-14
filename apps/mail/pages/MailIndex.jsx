const { Link, Outlet } = ReactRouterDOM

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  return (
    <div>
      mail app
      <h4>Hey lee</h4>
      <MailFilter />
      <MailFolderList />
      <MailList />
      <Link to='/mail/compose'>New Mail</Link>
      <Outlet />
    </div>
  )
}
