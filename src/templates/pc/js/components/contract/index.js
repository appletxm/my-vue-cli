import html from './template.html'

export default {
  template: html,
  props: {
    'isContractShow': {
      type: Boolean,
      default: false
    },
    'confirmCb': {
      type: Function
    }
  },
  computed: {},
  data() {
    return {}
  },
  methods: {
    $closeContract(event) {
      event.stopPropagation()
      this.isContractShow = false
      this.confirmCb()
    }
  },
  watch: {},
  created() {},
  mounted() {}
}
