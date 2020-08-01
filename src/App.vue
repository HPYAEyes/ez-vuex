<template>
  <div id="app">
    111
    <p>{{ this.$store.state.num }}</p>
    <p>name: {{ this.$store.getters.name }}</p>
    <button @click="$store.commit('add', { num: 1 })">+1</button>
    <button @click="$store.commit({
      type: 'add',
      num: 2
    })">+2</button>
    <button @click="$store.dispatch({
      type: 'addAsync',
      num: 5
    })">addAsync</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    // 调试用
    window.$vm0 = this;
  }
}
</script>
