const menuList = [
  {
    id: '1',
    title: '个人中心',
    isActived: false,
    path: '',
    parentModuleName: 'UserCenter',
    parentId: '',
    hasChild: true,
    children: [
      {
        id: '11',
        title: '修改资料',
        path: '/userCenter/userInfo',
        isActived: false,
        parentModuleName: 'UserCenter',
        isOusideLink: false,
        parentId: '1',
        hasChild: false,
        children: []
      },
      {
        id: '12',
        title: '修改密码',
        path: '/userCenter/changePassword',
        isActived: false,
        parentModuleName: 'UserCenter',
        isOusideLink: false,
        parentId: '1',
        hasChild: false,
        children: []
      }
    ]
  },

  {
    id: '2',
    title: '订单管理',
    isActived: false,
    path: '',
    parentModuleName: 'MyOrders',
    parentId: '',
    hasChild: true,
    children: [
      {
        id: '21',
        title: '我的订单',
        path: '/orders/orderList',
        isActived: false,
        parentModuleName: 'MyOrders',
        isOusideLink: false,
        parentId: '2',
        hasChild: false,
        children: []
      }
    ]
  },

  {
    id: '3',
    title: '发票管理',
    isActived: false,
    path: '',
    parentModuleName: 'MyInvoice',
    parentId: '',
    hasChild: true,
    children: [
      {
        id: '31',
        title: '开票抬头',
        path: '/invoice/invoiceSet',
        isActived: false,
        parentModuleName: 'MyInvoice',
        isOusideLink: false,
        parentId: '3',
        hasChild: false,
        children: []
      }
    ]
  }
]

export default menuList
