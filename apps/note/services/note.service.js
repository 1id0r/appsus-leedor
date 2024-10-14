import { storageService } from '../../../services/async-storage.service'
import { storageService } from '../../../services/storage.service'

const NOTE_KEY = 'noteDB'
_createNotes()
export const noteService = {
  query,
  get,
  save,
  remove,
  getEmptyNote,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    // Optional: Filter logic based on `filterBy`
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

function getEmptyNote() {
  return { title: '', content: '', type: 'NoteTxt', isPinned: false }
}

function _createNotes() {
  let notes = loadFromStoarge(NOTE_KEY)
  if (!notes || !notes.length) {
    const notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#00d',
        },
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
    ]
    saveToStorage(NOTE_KEY, notes)
  }
}
