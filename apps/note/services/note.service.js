import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
  query,
  get,
  save,
  remove,
  getEmptyNote,
  getDefaultFilter,
  togglePin,
  duplicate,
  toggleTodo,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      notes = notes.filter((note) => regExp.test(note.info.title) || regExp.test(note.info.txt))
    }

    return notes
  })
}
function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function getDefaultFilter() {
  return { title: '' }
}

function getEmptyNote() {
  return {
    id: '',
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: { backgroundColor: 'grey' },
    info: { title: '', txt: '', url: '', todos: '' },
  }
}

function togglePin(noteId) {
  return get(noteId).then((note) => {
    note.isPinned = !note.isPinned
    return save(note)
  })
}
function getRandomColor() {
  const colors = ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9']
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
function duplicate(noteId) {
  return get(noteId).then((note) => {
    const duplicatedNote = { ...note, id: '', createdAt: Date.now() }
    return save(duplicatedNote)
  })
}
function toggleTodo(noteId, todoIndex) {
  return get(noteId).then((note) => {
    if (note.type === 'NoteTodos') {
      note.info.todos[todoIndex].isDone = !note.info.todos[todoIndex].isDone
      return save(note)
    }
    return note
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    const notes = [
      {
        id: 'n101',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getRandomColor(),
        },
        info: {
          title: '1',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getRandomColor(),
        },
        info: {
          title: '1',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n103',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getRandomColor(),
        },
        info: {
          title: '1',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n104',
        createdAt: 1112222,
        type: 'NoteVideo',
        isPinned: true,
        style: {
          backgroundColor: getRandomColor(),
        },
        info: {
          title: '1',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
      },
      {
        id: 'n105',
        createdAt: 1112222,
        type: 'NoteImg',
        isPinned: true,
        style: {
          backgroundColor: getRandomColor(),
        },
        info: {
          title: '1',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfc4OHjLhcAzoGtn7Tw-ywGG_Wb-w3e4rjQ&s',
        },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}
