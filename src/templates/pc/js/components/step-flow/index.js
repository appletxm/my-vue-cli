import html from './template.html'

export default {
  template: html,
  props: {
    stepsData: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
