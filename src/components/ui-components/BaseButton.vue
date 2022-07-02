<template>
  <div>
    <button :class="mode">
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #ff2659;
  border: 1.5px solid #455d7a;
  color: #f5f4f3;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0.5rem;
  display: inline-block;
  /** opacity: 0.5; */
  transition: 0.5s;
}

a:hover,
a:active,
button:hover,
button:active {
  opacity: 1;
  background-color: #ff2f59;
  border-color: #455d7a;
  box-shadow: 0 2px 8px #3db2ff;
}
.event-table {
  padding: 5px;
  margin: 2px;
  background-color: #1e1e1e;
  // border: 1.5px solid #455d7a;
  font-size: 0.7em;
}
.default-raw {
  position: Fixed;
  bottom: 51px;
  right: 49px;
  border-radius: 30p;
  background-color: #3db2ff;
}
@media (max-width: 1400px) {
  button {
    padding: 7px;
    margin: 4px;
    font-size: 14px;
  }
}
</style>
