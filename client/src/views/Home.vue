<template>
  <main class="Home">
    
    <AddImage />
    <Gallery />

  </main>
</template>

<script>
import Gallery from '@/components/Gallery'
import AddImage from '@/components/AddImage'

export default {
  name: 'Home',
  components: { Gallery, AddImage },
}
</script>

<style lang="scss">

</style>
