import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookItem from './BookItem.vue'

describe('BookItem.vue', () => {
  // the book object has no information

  it('renders "No title available" when no title is passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book: {} } })
    expect(wrapper.find('[data-test="title"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="title"]').text()).toBe('No title available')
  })

  it("doesn't render authors when not passed", () => {
    const wrapper = shallowMount(BookItem, { props: { book: {} } })
    expect(wrapper.find('[data-test="authors"]').exists()).toBe(false)
  })

  it("doesn't render published year when date not passed", () => {
    const wrapper = shallowMount(BookItem, { props: { book: {} } })
    expect(wrapper.find('[data-test="publishedYear"]').exists()).toBe(false)
  })

  it("doesn't render description when not passed", () => {
    const wrapper = shallowMount(BookItem, { props: { book: {} } })
    expect(wrapper.find('[data-test="description"]').exists()).toBe(false)
  })

  it('displays "No image available" when url not passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book: {} } })
    expect(wrapper.find('[data-test="noImageAvailable"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="thumbnail"]').exists()).toBe(false)
  })

  // the book object has all the information
  const book = {
    volumeInfo: {
      title: 'Harry Potter',
      authors: ['J.K. Rowling', 'Joanne Kathleen Rowling'],
      categories: ['Fiction', 'Education'],
      publishedDate: '2015-12-08',
      description: 'Le jour de ses onze ans...',
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=ox9BiuVKM1cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      }
    }
  }

  it('renders title when passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book } })
    expect(wrapper.find('[data-test="title"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="title"]').text()).toBe('Harry Potter')
  })

  it('renders authors when passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book } })
    expect(wrapper.find('[data-test="authors"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="authors"]').text()).toBe(
      'J.K. Rowling, Joanne Kathleen Rowling'
    )
  })

  it('renders published year when date is passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book } })
    expect(wrapper.find('[data-test="publishedYear"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="publishedYear"]').text()).toBe('2015')
  })

  it('renders description when passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book } })
    expect(wrapper.find('[data-test="description"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="description"]').text()).toBe('Le jour de ses onze ans...')
  })

  it('displays image when url is passed', () => {
    const wrapper = shallowMount(BookItem, { props: { book } })
    expect(wrapper.find('[data-test="noImageAvailable"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="thumbnail"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="thumbnail"]').isVisible('img')).toBe(true)
    expect(wrapper.find('[data-test="thumbnail"]').attributes('src')).toBe(
      'http://books.google.com/books/content?id=ox9BiuVKM1cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    )
  })
})
