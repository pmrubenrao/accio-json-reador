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

    emits: ['close'],
    methods: {
      tryClose() {
        if (this.fixed) {
          return;
        }
        this.$emit('close');
      },
    },
  },
};
</script>
