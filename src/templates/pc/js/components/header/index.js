import html from './template.html'
import rcCodeImg from 'assets/images/rc-code.jpg'

export default {
  template: html,
  props: {},
  computed: {},
  data() {
    return {
      isCodeShow: false,
      rcCodeImg: null
    }
  },
  methods: {
    $toggleCode(event) {
      this.isCodeShow = !this.isCodeShow
      event.stopPropagation()
    }
  },
  watch: {},
  created() {
    this.rcCodeImg = rcCodeImg
  },
  mounted() {
    document.addEventListener('click', () => {
      this.isCodeShow = false
    })
  }
}
