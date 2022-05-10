<template>
  <div class="bookSearch">
    <header class="bookSearch-header">
      <div class="bookSearch-header-inner">
        <VInput
          class="bookSearch-input"
          v-model="searchInput"
          placeholder="Find a book"
          :readonly="query.isRequesting"
          @keyup.enter="search()"
        />
        <VButton :disabled="query.isRequesting" @click="search()">Search</VButton>
      </div>
    </header>
    <main class="bookSearch-result">
      <div class="bookSearch-result-inner">
        <!-- no search -->
        <div v-if="!query.keywords" class="bookSearch-result-placeholder">
          <span class="bookSearch-result-placeholder-title">Google Books</span>
          <span class="bookSearch-result-placeholder-subtitle">
            Search the world's most comprehensive index of full-text books
          </span>
          <BookShelvesSvg class="bookSearch-result-placeholder-img" />
        </div>

        <!-- search processing -->
        <div v-if="query.keywords && query.isRequesting" class="bookSearch-loader">
          <VLoader />
        </div>

        <!-- search finished -->
        <template v-if="query.keywords && !query.isRequesting">
          <div class="bookSearch-result-title">
            <b>Search "{{ query.keywords }}":</b>
            {{ query.totalItems }}
            {{ query.totalItems > 1 ? 'items found' : 'item found' }}
          </div>
          <div class="bookSearch-result-list">
            <BookItem v-for="book in query.books" :key="book.id" :book="book" />
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import VLoader from '@/components/ui/VLoader.vue'
import BookItem from '@/components/BookItem.vue'
import BookShelvesSvg from '@/assets/img/bookshelves.svg'

import { getBooks } from '@/services/books'

const searchInput = ref('')

const query = reactive({
  keywords: '',
  isRequesting: false,
  totalItems: 0,
  books: []
})

// get search result
const search = async () => {
  // reset query
  query.keywords = ''
  query.isRequesting = false
  query.totalItems = 0
  query.books = []

  // remove query extra spaces
  query.keywords = searchInput.value.split(' ').filter(Boolean).join(' ')

  // fetch books
  if (query.keywords) {
    query.isRequesting = true
    try {
      const data = await getBooks({ q: query.keywords, maxResults: 40 })
      query.totalItems = data?.totalItems || 0
      query.books = data?.items || []
    } catch {
      // TODO: display a notification
      alert('An error occured !')
    }
    query.isRequesting = false
  }
}
</script>

<style lang="scss" scoped>
$header-height: 4rem;
.bookSearch {
  &-header,
  &-result {
    &-inner {
      margin: 0 auto;
      max-width: 50rem;
    }
  }

  &-header {
    position: fixed;
    z-index: $zindex-fixed;
    top: 0;
    left: 0;
    right: 0;

    background: $body-bg;
    box-shadow: $shadow-large;

    &-inner {
      display: flex;
      align-items: center;
      height: $header-height;
      padding: 0 1.5rem;

      * {
        flex: 0 0 auto;
      }
    }
  }

  &-input {
    flex: 1 1 0;
    margin-right: 0.75rem;
  }

  &-result {
    margin-top: $header-height;
    padding: 1.5rem 0;

    &-title {
      padding: 0.75rem 1.5rem;
      font-size: $font-size-7;
      b {
        font-weight: $font-weight-semibold;
        margin-right: 0.5em;
      }
    }

    &-placeholder {
      padding: 0 1.5rem;
      text-align: center;

      height: calc(100vh - 10rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-title {
        font-size: $font-size-3;
        font-weight: $font-weight-semibold;
        margin-bottom: 0.5rem;
      }

      &-subtitle {
        font-size: $font-size-6;
        margin-bottom: 5rem;
      }

      &-img {
        display: block;
        width: 100%;
        max-width: 20rem;
      }
    }
  }

  &-loader {
    text-align: center;
    font-size: 2.5rem;
    color: $primary;

    height: calc(100vh - 10rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
