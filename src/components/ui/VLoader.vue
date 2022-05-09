<template>
  <span class="loader"></span>
</template>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  height: 1em;
  width: 1em;
  border-radius: $radius-rounded;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-top-color: transparent;
  animation: rotate 0.5s linear infinite;
}
</style>
