import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'
import storage from 'common/storage'

export default {
  doValidate(_this) {
    let msg,
      res,
      strPre

    res = true
    strPre = _this.addressType === 2 ? '收件人' : '寄件人'
    if (formValidate.normal(_this.name, 2, 8) === false) {
      msg = '请输入正确的' + strPre + '姓名'
      res = false
    } else if (formValidate.phone(_this.phone) === false) {
      msg = '请输入正确的' + strPre + '联系电话'
      res = false
    } else if (!_this.provinceName || !_this.cityName || !_this.areaName) {
      msg = '请输入正确省、市、区'
      res = false
    } else if (formValidate.text(_this.address || '', 2, 50) === false) {
      msg = '请输入正确的' + strPre + '详细地址'
      res = false
    }

    if (res === false) {
      _this.$toast({
        message: msg,
        duration: 3000,
        className: 'mint-toast-width'
      })
    }

    return res
  },

  renderAddress(_this, item) {
    _this.addressId = item.id
    _this.name = item.name
    _this.phone = item.phone
    _this.address = item.address
    _this.defaultFlag = item.defaultFlag || 0
    _this.areaCode = item.areaCode
    _this.provinceCode = item.provinceCode
    _this.cityCode = item.cityCode

    if (_this.addressType === 1) {
      _this.provinceName = '广东省'
      _this.cityName = '广州市'
      _this.areaName = '花都区'
      _this.areaCode = '440114'
      _this.provinceCode = '440000'
      _this.cityCode = '440100'
    } else {
      _this.provinceName = item.provinceName
      _this.cityName = item.cityName
      _this.areaName = item.areaName
    }
  },

  saveAddress(_this) {
    let params,
      url

    params = {
      userId: this.getUserId(_this),
      id: _this.addressId,
      name: _this.name,
      phone: _this.phone,
      provinceName: _this.provinceName,
      cityName: _this.cityName,
      areaName: _this.areaName,
      provinceCode: _this.provinceCode,
      cityCode: _this.cityCode,
      areaCode: _this.areaCode,
      address: _this.address,
      addressType: storage.getAddresTypeToStorage('addressType'),
      defaultFlag: _this.defaultFlag
    }
    console.log(params)
    url = _this.addressId ? apiUrls.modifyAddress : apiUrls.addAddress
    axios.post(url, params).then((res) => {
      _this.$indicator.close()
      _this.$closeEditPage()
      if (res) {
        this.showMsg(_this, '地址保存成功', 'fr-iconfont icon-radio-check-s', '')
        _this.$saveAddressSuccess((res.data)[0])
      }
    }).catch((error) => {
      _this.$indicator.close()
      this.saveAddressFailed(_this, error)
    })
  },

  saveAddressFailed(_this, error) {
    console.error(error)
    this.showMsg(_this, error.message || error, 'fr-iconfont icon-info', 'mint-toast-width')
  },

  showMsg(_this, msg, icon, css) {
    _this.$toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  },

  getUserId(_this) {
    let userInfo

    userInfo = storage.getUserInfoFromStorage()
    return _this.$store.state.userInfo.userId || userInfo.userId
  }
}
