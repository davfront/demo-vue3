<template>
  <div class="bookItem">
    <div class="bookItem-thumbnail">
      <img class="bookItem-thumbnail-img" v-if="thumbnailLink" :src="thumbnailLink" :alt="title" />
      <div class="bookItem-thumbnail-placeholder" v-else>No image availabe</div>
    </div>
    <div class="bookItem-details">
      <div class="bookItem-title">{{ title || 'No title' }}</div>
      <div class="bookItem-metaInfo">
        <span v-if="authors" class="bookItem-metaInfo-item">{{ authors }}</span>
        <span v-if="publishedYear" class="bookItem-metaInfo-item">{{ publishedYear }}</span>
        <span v-if="categories" class="bookItem-metaInfo-item">{{ categories }}</span>
      </div>
      <div class="bookItem-description" v-if="description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// props: book
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

// computed book info
const title = computed(() => props.book?.volumeInfo?.title)
const description = computed(() => props.book?.volumeInfo?.description)

const authors = computed(() => props.book?.volumeInfo?.authors?.filter(Boolean).join(', '))
const publishedYear = computed(() => props.book?.volumeInfo?.publishedDate?.split('-')[0])
const categories = computed(() => props.book?.volumeInfo?.categories?.filter(Boolean).join(', '))

const thumbnailLink = computed(() => props.book?.volumeInfo?.imageLinks?.thumbnail)
</script>

<style lang="scss" scoped>
.bookItem {
  display: flex;
  padding: 1.5rem;

  &-thumbnail {
    flex: 0 0 8rem;
    max-width: 6.325rem;
    margin-right: 1.5rem;
    @media only screen and (max-width: 640px) {
      display: none;
    }
    &-img {
      display: block;
      width: 100%;
      box-shadow: $shadow;
      border-radius: $radius-small;
    }
    &-placeholder {
      display: block;
      box-shadow: $shadow;
      border-radius: $radius-small;
      background: $gray-100;
      color: $gray-600;
      height: 8.875rem;

      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1rem;
      font-size: $font-size-7;
    }
  }

  &-details {
    flex: 1 1 0;
    min-width: 0;
  }

  &-title {
    font-size: $font-size-5;
    font-weight: $font-weight-semibold;
    margin-bottom: 0.75rem;
  }

  &-metaInfo {
    font-size: $font-size-7;
    margin-bottom: 0.75rem;
    color: $primary;

    // separator
    &-item {
      & + & {
        &::before {
          content: '·';
          display: inline-block;
          margin: 0 0.75em;
        }
      }
    }
  }

  &-description {
    font-size: $font-size-7;
  }
}
</style>
