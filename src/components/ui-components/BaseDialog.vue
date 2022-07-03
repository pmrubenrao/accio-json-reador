<template>
  <!-- teleport to="body"> -->
  <div>
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" class="scrolly">
        <div>
          <menu
            ><h1>Raw JSON Response</h1>
            <slot name="actions">
              <base-button @click="tryClose">Close</base-button>
            </slot>
          </menu>
          <slot name="header">
            <pre>{{ JSON.stringify(title, null, 2) }}</pre>
          </slot>
        </div>
      </dialog>
    </transition>
  </div>
  <!-- </teleport> -->
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: Object,
      required: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.scrolly::-webkit-scrollbar {
  width: 5px;
}

.scrolly::-webkit-scrollbar-track {
  background-color: #1e1e1e;
  border-radius: 100px;
}

.scrolly::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: #ff2f59;
  box-shadow: inset 2px 2px 5px 0 rgb(rgb(5, 5, 5), 0.5);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

pre {
  overflow-x: auto !important;
  white-space: pre-wrap !important; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap !important; /* Opera 4-6 */
  white-space: -o-pre-wrap !important; /* Opera 7 */
  word-wrap: break-word !important; /* Internet Explorer 5.5+ */
}

code {
  white-space: normal !important;
}

dialog {
  padding: 0em;
  position: fixed;
  scrollbar-color: #6969dd #e0e0e0;
  scrollbar-width: thin;
  width: 70em;
  // margin-left: 116px;
  // margin-left:-100px;
  // margin-right: -100px;
  height: 700px;
  margin-top: -246px;
  z-index: 10000000;
  border: none;
  border-radius: 8px;
  background-color: #1e1e1e;
  overflow-y: auto;
}

div {
  background-color: #1e1e1e;
  color: #aebbc4;
  //width: 100%;
  padding: 0.5em 1em;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  h1 {
    padding: 0px;
  }
  top: 0;
  margin: 0;
  position: sticky;
  padding: 0 rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
@media (max-width: 1400px) {
  dialog {
    width: 61em;
    height: 611px;
    margin-top: -246px;
    font-size: 12px;
  }
}
</style>
