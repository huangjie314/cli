<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      title: 'This is List Page',
    };
  },
};
</script>

<style lang="less" scoped>
div {
  background: blue;
}
</style>
