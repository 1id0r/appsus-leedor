const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/pages/MailCompose.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NoteEdit } from './apps/note/pages/NoteEdit.jsx'

import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
import { Dashboard } from './apps/book/pages/Dashboard.jsx'

export function App() {
  const [page, setPage] = useState('home')
  console.log(page)

  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mail' element={<MailIndex />}>
            <Route path='/mail/compose' element={<MailCompose />} />
          </Route>
          <Route path='/mail/:mailId' element={<MailDetails />} />
          <Route path='/note' element={<NoteIndex />}>
            <Route path='/note/edit/:noteId' element={<NoteEdit />} />
          </Route>
          <Route path='/note/add' element={<NoteAdd />} />
          <Route path='/book' element={<BookIndex />}>
            <Route path='/book/edit/' element={<BookEdit />} />
            <Route path='/book/edit/:bookId' element={<BookEdit />} />
          </Route>
          <Route path='/book/:bookId' element={<BookDetails />} />
          <Route path='/book/Dashboard' element={<Dashboard />} />
        </Routes>
      </section>
    </Router>
  )
}
