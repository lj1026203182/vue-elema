<template>
  <div class="login">
    <div class="img-wrapper">
      <img src="../assets/logo.jpg" alt />
    </div>
    <field-group
      type="number"
      v-model="phone"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      placeholder="手机号"
      @onClick="getVerifyCode"
    ></field-group>
    <field-group type="number" v-model="verifyCode" :error="errors.code" placeholder="验证码"></field-group>
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <div class="login_btn">
      <van-button type="primary" size="large" :disabled="isClick" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import FieldGroup from '../components/FieldGroup/FieldGroup'
import { serverApi } from '../axios/index'
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      disabled: false
    }
  },
  methods: {
    handleLogin() {
      //输错了 再输入手机号和验证码 复原errors
      this.errors = {}
      let d = {
        phone: this.phone,
        code: this.verifyCode
      }
      serverApi(
        '/posts/sms_back',
        d,
        response => {
          console.log(response);
          this.$toast(response.data.msg)
          localStorage.setItem('login', JSON.stringify(response.data.user))
          this.$router.push('/')
        },
        error => {
          this.$toast(response.data.msg)
          this.errors = {
            code: error.response.data.msg
          }
        }
      )
    },
    getVerifyCode() {
      if (this.validataPhone()) {
        //成功后倒计时
        this.validataBtn()
        let d = {
          tpl_id: '165724',
          key: 'eb89d1a0fe18a65fc650e65ad5d5475d',
          phone: this.phone
        }
        serverApi(
          '/posts/sms_send',
          d,
          response => {
            // console.log(response);
          },
          error => {
            console.log(error)
          }
        )
      }
    },
    validataPhone() {
      if (!this.phone) {
        this.errors = { phone: '手机号码不能为空' }
        return false
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.errors = { phone: '请输入正确的手机号码' }
        return false
      } else {
        this.errors = {}
        return true
      }
    },
    validataBtn() {
      let start = 10
      let timer = setInterval(() => {
        if (start === 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          this.btnTitle = `已发送(${start}s)`
          this.disabled = true
          start--
        }
      }, 1000)
    }
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true
      else return false
    }
  },
  components: {
    FieldGroup
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  width: 100%;
  height: 100%;
  .img-wrapper {
    padding: 50px 0 10px 0;
    text-align: center;
    width: 100%;
    img {
      width: 50%;
    }
  }
}
.login_des,
.login_btn {
  margin: 10px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.van-button {
  width: 100%;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
}
</style>