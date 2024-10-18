import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const BOOK_KEY = 'BookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getEmptyReview,
  addReview,
  removeReview,
  getGoogleBooks,
  getGoogleBook,
  getCategories,
  getKeywordsSize,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((book) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      book = book.filter((book) => regExp.test(book.title))
    }
    if (filterBy.amount) {
      book = book.filter((book) => book.listPrice.amount >= filterBy.amount)
    }
    return book
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function addReview(bookId, review) {
  return get(bookId)
    .then((book) => {
      if (!book.reviews) book.reviews = []
      book.reviews.push(review)
      return book
    })
    .then(save)
}

function removeReview(bookId, reviewIdx) {
  return get(bookId)
    .then((book) => {
      book.reviews.splice(reviewIdx, 1)
      return book
    })
    .then(save)
}

function getEmptyBook(title = '', description = '', thumbnail = 'assets/img/BooksImages/1.jpg', amount = '') {
  return {
    title,
    subtitle: '',
    authors: [],
    publishedDate: '',
    description,
    pageCount: '',
    categories: [],
    thumbnail,
    language: 'en',
    listPrice: {
      amount,
      currencyCode: '',
      isOnSale: null,
    },
  }
}

function getEmptyReview(fullName = '', rating = '', readAt = '') {
  return {
    fullName,
    rating,
    readAt,
  }
}

function getDefaultFilter(searchParams) {
  const title = searchParams.get('title') || ''
  const amount = searchParams.get('amount') || ''
  return { title, amount }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
      const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.getRandomFullNames()],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `./assets/img/books//${i + 1}.jpg`,
        language: 'en',
        listPrice: {
          amount: utilService.getRandomIntInclusive(80, 500),
          currencyCode: 'EUR',
          isOnSale: Math.random() > 0.7,
        },
      }
      books.push(book)
    }
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount = 200) {
  // const book = getEmptyBook(title, amount)
  const id = utilService.makeId()
  return {
    id,
    title: 'metus hendrerit',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: '/assets/img/BooksImages/1.jpg',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

function getGoogleBooks(res) {
  const prm = fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${res}`)
  return prm.then((res) => res.json())
}

function getGoogleBook({ volumeInfo }) {
  const { title, subtitle, authors, publishedDate, description, pageCount, categories, language, imageLinks } =
    volumeInfo
  const book = {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    language,
    thumbnail: imageLinks.thumbnail,
    listPrice: {
      amount: 100,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
  return book
}

function getCategories() {
  return query()
    .then((books) => {
      return books.reduce((acc, { categories }) => {
        acc = [...acc, ...categories]
        return acc
      }, [])
    })
    .then((categories) => {
      return categories.reduce((acc, category) => {
        if (!acc[category]) acc[category] = 0
        acc[category]++
        return acc
      }, {})
    })
}

function getKeywordsSize() {
  const allKeyWords = gImgs.reduce((acc, img) => {
    const keywords = img.keywords
    acc.push(...keywords)
    return acc
  }, [])
  const keywordCount = allKeyWords.reduce((acc, keyword) => {
    if (!acc[keyword]) acc[keyword] = 0
    acc[keyword]++
    return acc
  }, {})
  return keywordCount
}
