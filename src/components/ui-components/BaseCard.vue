<template>
  <div :class="mode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: 'card',
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px #3db2ff;
  padding: 1.2rem;
  background-color: #1e1e1e;
  font-size: 12px;
  // margin: 10px 26px;
}

.transaction-card-success {
  border-radius: 12px;
  box-shadow: 0 2px 8px #2fff40;
  padding: 1.2rem;
  background-color: #1e1e1e;
}

.transaction-card-error {
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff2f59;
  padding: 1.2rem;
  background-color: #1e1e1e;
}

.transaction-card-warn {
  border-radius: 12px;
  box-shadow: 0 2px 8px#ffe72f;
  padding: 1.2rem;
  background-color: #1e1e1e;
}
</style>
