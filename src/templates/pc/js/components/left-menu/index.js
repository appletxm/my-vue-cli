import html from './template.html'
import models from './models'
import { SET_MENU_DATA } from 'store/mutation-types'

export default {
  template: html,
  data() {
    return {
      list: [],
      lastSelectedItem: null,
      currentSelectedItme: null
    }
  },

  computed: {},

  methods: {
    $menuCellClick(event, item) {
      if (item.hasChild !== true) {
        if (item.isActived === true) {
          event.stopPropagation()
          return
        }

        this.lastSelectedItem = this.currentSelectedItme
        this.currentSelectedItme = item
        if (this.lastSelectedItem) {
          this.lastSelectedItem.isActived = !this.lastSelectedItem.isActived
        }

        models.openLeftMenuLink(item, 'left', this)
      }
      item.isActived = !item.isActived

      if (event) {
        event.stopPropagation()
      }
    },

    $isOpened(item) {
      return item.hasChild === true && item.isActived === true
    },

    $selectMenuItem(selectedMenuInfo) {
      let tmpInfo

      tmpInfo = models.getCurrentMenuInfo(selectedMenuInfo)

      if (tmpInfo.menuId) {
        if (tmpInfo.type !== 'left' && (this.currentSelectedItme ? this.currentSelectedItme.id !== tmpInfo.menuId : true)) {
          models.selectMenuItemAuto(this, tmpInfo.menuId)
        }
      } else {
        models.clearFocus(this.list)
      }
    }
  },

  components: {},

  watch: {
    '$store.state.currentMenuId'(value) {
      this.$selectMenuItem(value)
    }
  },

  async created() {
    const menuData = await models.getMenuData()
    this.$store.commit(SET_MENU_DATA, menuData || [])
    this.list = menuData || []
  },

  mounted() {}
}
