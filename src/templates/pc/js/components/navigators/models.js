import * as data from './nav-data'
import axios from 'axios'
import { storage, CURRENT_MODULE, CURRENT_MENU_ID } from 'common/storage'
import { SET_CURRENT_MODULE, SET_USER_LOGIN_STATUS } from 'store/mutation-types'
import leftMenuModels from 'components/left-menu/models'
import auth from 'common/auth'
import apiUrls from 'common/apiUrls'

export default {
  getNavData() {
    return {
      nav: data.navData,
      moduleName: data.MODULE_NAME
    }
  },

  openNavLink(_this, currentModule, currentMenuInfo, path) {
    this.updateCacheForCurrentModule(_this.$store, currentModule)
    leftMenuModels.updateCacheForCurrentMenuId(_this.$store, currentMenuInfo.replace(/_left$/, '_nav'))
    !path || _this.$router.push(path)
  },

  urlMatchNavItem(_this) {
    let path = window.location.hash.replace(/#/, '')
    let matchedItemList = []

    if (!path || path === '/') {
      _this.$changeNav(_this.navList[0])
    } else {
      this.doMatch(path, _this.navList, matchedItemList)
      if (matchedItemList.length > 0) {
        _this.$changeNav(matchedItemList[0])
      } else {
        this.openNavLink(_this, storage.get(CURRENT_MODULE), storage.get(CURRENT_MENU_ID))
      }
    }
  },

  doMatch(path , navData, matchedItemList) {
    for (let nav of navData) {
      if (nav.path === path) {
        matchedItemList.push(nav)
      } else if (nav.children && nav.children.length >= 0) {
        this.doMatch(path, nav.children, matchedItemList)
      }
    }
  },

  updateCacheForCurrentModule(conStore, value) {
    storage.set(CURRENT_MODULE, value)
    conStore.commit(SET_CURRENT_MODULE, value)
  },

  decorateNavData(navList) {
    let userInfo = storage.getUserInfoFromStorage()
    navList[navList.length - 1]['title'] = userInfo.userName || userInfo.nickName || (userInfo.mobile.replace(/^(\d{3})(\d{6})(\d{2})$/, '$1******$3'))
    return navList
  },

  loginOut(_this) {
    axios.post(apiUrls.userLogOut)
      .then((res) => {
        storage.loginOutRemoveAll()
        auth.removeAllCookie()
        _this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
        window.location.href = '/login.html'
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
