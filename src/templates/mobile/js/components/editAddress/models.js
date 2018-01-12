/* global _ */
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import { SET_USER_DEFAULT_ADDRESS, SET_USER_RECEIVE_DEFAULT_ADDRESS, SET_LOGIN_METHOD } from 'store/mutationTypes'
import formValidate from 'utils/formValidate'
import storage from 'common/storage'
import * as errorHandler from 'common/errorHandler'

export default {
  isInfoEdit(_this, addressInfo) {
    return _this.name !== addressInfo.name || _this.phone !== addressInfo.phone || _this.provinceName !== addressInfo.provinceName || _this.cityName !== addressInfo.cityName || _this.areaName !== addressInfo.areaName || _this.address !== addressInfo.address
  },

  getSourceInfo(_this) {
    let addressInfo,
      addressType

    addressType = _this.addressType || storage.getAddresTypeToStorage('addressType')

    if (addressType === 1) {
      addressInfo = _this.defaultAddress || storage.getDefaultAddressToStorage()
      if (!addressInfo) {
        addressInfo = {
          provinceName: '广东省',
          cityName: '广州市',
          areaName: '花都区',
          provinceCode: '440000',
          cityCode: '440000',
          areaCode: '440114'
        }
      }
    } else {
      addressInfo = _this.reviceAddress || storage.getReceiveAddressToStorage()
      if (!addressInfo) {
        addressInfo = {}
      }
    }

    return addressInfo
  },

  setAddressInfo(_this) {
    let addressInfo

    addressInfo = this.getSourceInfo(_this)

    // console.info(_this.addressType, addressInfo)

    _this.name = addressInfo.name
    _this.phone = addressInfo.phone
    _this.provinceName = addressInfo.provinceName
    _this.cityName = addressInfo.cityName
    _this.areaName = addressInfo.areaName
    _this.address = addressInfo.address
    _this.areaCode = addressInfo.areaCode
    _this.provinceCode = addressInfo.provinceCode
    _this.cityCode = addressInfo.cityCode
    _this.addressId = addressInfo.id || null
  },

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
      msg = '请输入正确的' + strPre + '手机号码'
      res = false
    } else if (!_this.provinceName || !_this.cityName || !_this.areaName) {
      msg = '请输入正确省、市、区'
      res = false
    } else if (formValidate.text(_this.address, 2, 50) === false) {
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

  saveAddress(_this) {
    let params,
      url

    params = this.getAddressObjectInfo({userId: storage.getUserId(_this.userInfo.userId)}, _this)

    url = apiUrls.addAddress
    axios.post(url, params).then((res) => {
      _this.$indicator.close()
      this.showMsg(_this, '地址保存成功', 'fr-iconfont icon-radio-check-s', '')
      this.saveAddressToStore(_this)
      _this.$closeEditPage()
    }).catch((error) => {
      _this.$indicator.close()
      this.saveAddressFailed(_this, error)
    })
  },

  saveAddressFailed(_this, error) {
    console.error(error)
    if (error.code && error.code === '-1') {
      errorHandler.errorPopMsg.showTimeoutErrConfrim()
    } else {
      this.showMsg(_this, error.message || error, 'fr-iconfont icon-info', 'mint-toast-width')
    }
  },

  saveAddressToStore(_this) {
    let newDefaultAddress,
      addressType

    addressType = _this.addressType || storage.getAddresTypeToStorage('addressType')

    newDefaultAddress = this.getAddressObjectInfo({id: null}, _this)

    _this.$store.commit(addressType === 1 ? SET_USER_DEFAULT_ADDRESS : SET_USER_RECEIVE_DEFAULT_ADDRESS, newDefaultAddress)
    _this.$closeEditPage()
    _this.setSuccessCb(addressType, newDefaultAddress)

    if (addressType === 1) {
      storage.setDefaultAddressToStorage(newDefaultAddress)
    } else if (_this.addressType === 2) {
      storage.setReceiveAddressToStorage(newDefaultAddress)
    }
  },

  showMsg(_this, msg, icon, css) {
    _this.$toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  },

  getListSonArea(areaCode) {},

  openLoginPanel(_this) {
    _this.isPopShow = true
    _this.$store.commit(SET_LOGIN_METHOD, 1)
  },

  getAddressObjectInfo(extendsInfo, _this) {
    let info = {
      name: _this.name,
      phone: _this.phone,
      provinceName: _this.provinceName,
      cityName: _this.cityName,
      areaName: _this.areaName,
      address: _this.address,
      addressType: _this.addressType,
      provinceCode: _this.provinceCode,
      cityCode: _this.cityCode,
      areaCode: _this.areaCode
    }

    info = _.assign(info, extendsInfo)

    return info
  }
}
