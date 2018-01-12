import html from './template.html'
import TipsMenu from '../tips-menu'
import models from './models'

export default {
  template: html,
  data() {
    return {
      selectedIndex: 0,
      helpTipsMenuShow: false,
      currentModule: '',
      navList: [],
      loadingObj: null,
      msgObj: null
    }
  },
  methods: {
    openHelpMenu() {
      this.helpTipsMenuShow = true
    },

    changeSubModuleCb(item) {
      if (item.id === 'loginout') {
        this.$loginOut()
      } else {
        this.$changeNav(item)
        this.helpTipsMenuShow = false
      }
    },

    $changeNav(nav, event) {
      let {path, parentModuleName, menuItemId, children} = nav

      if (event) {
        event.stopPropagation()
      }

      if (children && children.length > 0) {
        this.helpTipsMenuShow = true
        return false
      }

      models.openNavLink(this, parentModuleName, menuItemId + '_' + nav.title + '_' + 'nav', !menuItemId ? path : '')
    },

    $loginOut() {
      models.loginOut(this)
    },

    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },

    $closeMsg() {
      if (this.msgObj) {
        this.msgObj.close()
      }
    },

    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },

    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    }
  },

  components: {
    'tips-menu': TipsMenu
  },

  created() {
    let {nav, moduleName} = models.getNavData()
    nav = models.decorateNavData(nav)
    this.navList = nav
    this.moduleName = moduleName
  },

  mounted() {
    document.addEventListener('click', (e) => {
      this.helpTipsMenuShow = false
    })

    models.urlMatchNavItem(this)
  }
}
