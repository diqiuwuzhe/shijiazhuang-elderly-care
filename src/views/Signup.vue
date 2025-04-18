<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2>用户注册</h2>
      <el-form @submit.prevent="handleSignup" class="signup-form">
        <el-form-item>
          <el-input
            v-model="email"
            type="email"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-message"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
            注册
          </el-button>
        </el-form-item>
        <div class="form-footer">
          <span>已有账号？</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '../utils/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleSignup = async () => {
  if (!email.value) {
    ElMessage.warning('请输入邮箱')
    return
  }
  if (!email.value.includes('@')) {
    ElMessage.warning('请输入正确的邮箱格式')
    return
  }

  if (!password.value) {
    ElMessage.warning('请输入密码')
    return
  }
  if (password.value.length < 6) {
    ElMessage.warning('密码长度不能少于6位')
    return
  }
  if (password.value !== confirmPassword.value) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  loading.value = true
  try {
    const { error } = await signUp(email.value, password.value)
    if (error) throw error
    ElMessage.success('注册成功，请查收邮件激活账号')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.message || '注册失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.signup-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.signup-container h2 {
  text-align: center;
  color: #409EFF;
  margin-bottom: 30px;
}

.signup-form {
  width: 100%;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.form-footer a {
  color: #409EFF;
  text-decoration: none;
  margin-left: 5px;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>