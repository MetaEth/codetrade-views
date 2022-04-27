<template>
  <div>
    <WebHeader></WebHeader>
    <Data></Data>




  </div>
</template>

<script>
import Data from './shop/Data'
import WebHeader from '../components/WebHeader'

export default {
  name: 'Index',
  components: {WebHeader, Data},
  created () {

  }

}
</script>

<style scoped>

</style>
