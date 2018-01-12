import html from './template.html'
import StepFlow from 'components/step-flow'
import CountDown from 'components/count-down'
import models from './models'

const steps = [
  {
    id: '0',
    name: '验证身份',
    event: '$validateCode'
  },
  {
    id: '1',
    name: '设置新密码',
    event: '$doChangePass'
  },
  {
    id: '2',
    name: '成功'
  }
]

export default {
  template: html,
  data() {
    return {
      uniqueId: null,
      verifyCode: '',
      maxTimeLength: 120,
      mobile: '',
      newPwd: '',
      confirmPwd: '',
      msgObj: null,
      activeIndex: 0,
      steps: steps,
      isFlowCompleted: false
    }
  },
  computed: {
    'isMiddelStesp'() {
      return this.activeIndex > 0 && this.activeIndex < steps.length - 1
    }
  },

  components: {
    'step-flow': StepFlow,
    'count-down': CountDown
  },
  methods: {
    $doChangePass() {
      let result = models.doValidate(this)
      if (result.res === true) {
        models.changePwd(this)
      } else {
        this.$showMsg('warning', result.msg)
      }
    },

    $validateCode(cb) {
      if (!this.verifyCode) {
        this.$showMsg('warning', '请输入验证码')
        return false
      }

      if (cb && typeof cb === 'function') {
        cb()
      }
    },

    $getUniqueId(res) {
      this.uniqueId = res.substr(0, 41)
    },

    $goToNextStep() {
      let event = steps[this.activeIndex]['event']

      if (event && this[event] && typeof this[event] === 'function') {
        this[event](this.$changeToNextStep)
      } else {
        this.$changeToNextStep()
      }
    },

    $changeToNextStep() {
      this.activeIndex++
    },

    $goToPrevStep() {
      this.activeIndex--
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
    }
  },
  created() {
    models.getUserInfo(this)
  }
}
