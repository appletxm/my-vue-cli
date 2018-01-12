export const subMenuList = [
  {
    id: 'changePassword',
    title: '修改密码',
    isShow: true,
    path: '/userCenter/changePassword',
    parentModuleName: 'UserCenter',
    menuItemId: '12',
    isOusideLink: false,
    hasChild: false,
    children: []
  },
  {
    id: 'changeUserInfo',
    title: '修改资料',
    isShow: true,
    path: '/userCenter/userInfo',
    parentModuleName: 'UserCenter',
    menuItemId: '11',
    isOusideLink: false,
    hasChild: false,
    children: []
  },
  {
    id: 'loginout',
    title: '退出登录',
    isShow: true,
    path: '/login',
    parentModuleName: 'UserCenter',
    event: 'loginOut',
    isOusideLink: true,
    hasChild: false,
    children: []
  }
]

export const navData = [
  {
    id: 'home',
    title: '首页',
    isShow: true,
    path: '/home',
    parentModuleName: 'Home',
    menuItemId: '',
    isOusideLink: false,
    icon: 'rf-iconfont icon-home',
    hasChild: false,
    children: []
  },

  {
    id: 'userOperations',
    title: '用户',
    isShow: true,
    path: '/userOperations',
    parentModuleName: 'UserCenter',
    menuItemId: '',
    isOusideLink: false,
    icon: 'rf-iconfont icon-account',
    hasChild: true,
    children: subMenuList
  }
]

export const MODULE_NAME = '设计师中心'
