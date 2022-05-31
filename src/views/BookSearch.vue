<template>
  <div class="bookSearch">
    <header class="bookSearch-header">
      <div class="bookSearch-header-inner">
        <VInput
          class="bookSearch-input"
          v-model="searchInput"
          placeholder="Find a book"
          :readonly="query.isRequesting"
          @keyup.enter="initQuery()"
        />
        <VButton :disabled="query.isRequesting" @click="initQuery()">Search</VButton>
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

        <!-- new search loader -->
        <div
          v-if="query.keywords && currentPage === 0 && query.isRequesting"
          class="bookSearch-loader"
        >
          <VLoader />
        </div>

        <!-- results -->
        <template v-if="query.keywords && currentPage > 0">
          <div class="bookSearch-result-title">
            <b>Search "{{ query.keywords }}":</b>
            {{ query.totalItems }}
            {{ query.totalItems > 1 ? 'items found' : 'item found' }}
          </div>
          <div class="bookSearch-result-list">
            <BookItem v-for="book in query.books" :key="book.id" :book="book" />
          </div>
        </template>

        <!-- more results -->
        <div class="bookSearch-loadingMore" v-if="hasMoreResults" ref="loadMoreEl">
          <VLoader class="bookSearch-loadingMore-loader" />
          Loading more...
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'
import VLoader from '@/components/ui/VLoader.vue'
import BookItem from '@/components/BookItem.vue'
import BookShelvesSvg from '@/assets/img/bookshelves.svg'

import { getBooks } from '@/services/books'

const MAX_RESULTS = 40

const searchInput = ref('')

const query = reactive({
  keywords: '',
  isRequesting: false,
  totalItems: 0,
  books: []
})

// computed refs
const currentPage = computed(() => {
  return Math.ceil(query.books.length / MAX_RESULTS)
})
const totalPages = computed(() => {
  return Math.ceil(query.totalItems / MAX_RESULTS)
})
const hasMoreResults = computed(() => {
  return currentPage.value < totalPages.value
})

// reset query
const resetQuery = async () => {
  query.keywords = ''
  query.isRequesting = false
  query.totalItems = 0
  query.books = []
}

// load books
const fetchMoreResults = async () => {
  if (query.keywords && !query.isRequesting) {
    query.isRequesting = true
    try {
      const data = await getBooks({
        q: query.keywords,
        maxResults: MAX_RESULTS,
        startIndex: query.books.length
      })
      query.totalItems = data?.totalItems || 0
      const newItems = data?.items || []
      query.books.push(...newItems)
    } catch {
      // TODO: display a notification
      alert('An error occured !')
    }
    query.isRequesting = false
  }
}

// init search
const initQuery = async () => {
  // reset query
  resetQuery()

  // remove query extra spaces
  query.keywords = searchInput.value.split(' ').filter(Boolean).join(' ')

  // fetch books
  if (query.keywords) {
    fetchMoreResults()
  }
}

// load more books
const loadMoreEl = ref(null)
const observer = new IntersectionObserver((entries) => {
  const firstEntry = entries[0]
  if (firstEntry.isIntersecting) {
    fetchMoreResults()
  }
})
watch(loadMoreEl, async (newLoadMoreEl) => {
  if (newLoadMoreEl) {
    observer.observe(newLoadMoreEl)
  }
})
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
    font-size: 2.5rem;
    color: $primary;

    height: calc(100vh - 10rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-loadingMore {
    font-size: $font-size-7;
    background: rgba($primary, 0.05);
    border-radius: $radius;
    padding: 0.75rem 0;
    margin: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    &-loader {
      color: $primary;
      font-size: $font-size-5;
      margin-right: 0.75em;
    }
  }
}
</style>
