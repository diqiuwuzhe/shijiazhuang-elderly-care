<template>
  <div class="profile-page" v-if="userStore.user">
    <div class="user-info">
      <div class="avatar">
        <el-avatar :size="80" icon="el-icon-user" />
      </div>
      <h2>{{ userStore.user.email }}</h2>
      <p class="user-id">ID: {{ userStore.user.id }}</p>
    </div>

    <div class="menu-list">
      <div class="menu-group">
        <div class="menu-title">我的服务</div>
        <el-cell-group>
          <el-cell title="我的预约" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><Calendar /></el-icon>
            </template>
            <template #default>
              <el-icon><ArrowRight /></el-icon>
            </template>
          </el-cell>
          <el-cell title="浏览历史" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><Timer /></el-icon>
            </template>
            <template #default>
              <el-icon><ArrowRight /></el-icon>
            </template>
          </el-cell>
          <el-cell title="我的评价" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><ChatDotRound /></el-icon>
            </template>
            <template #default>
              <el-icon><ArrowRight /></el-icon>
            </template>
          </el-cell>
        </el-cell-group>
      </div>

      <div class="menu-group">
        <div class="menu-title">系统设置</div>
        <el-cell-group>
          <el-cell title="消息通知" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><Bell /></el-icon>
            </template>
            <template #default>
              <el-switch v-model="notifications" />
            </template>
          </el-cell>
          <el-cell title="隐私设置" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><Lock /></el-icon>
            </template>
            <template #default>
              <el-icon><ArrowRight /></el-icon>
            </template>
          </el-cell>
          <el-cell title="关于我们" :border="false">
            <template #icon>
              <el-icon class="menu-icon"><InfoFilled /></el-icon>
            </template>
            <template #default>
              <el-icon><ArrowRight /></el-icon>
            </template>
          </el-cell>
        </el-cell-group>
      </div>
    </div>

    <el-button type="danger" plain class="logout-btn" @click="handleLogout">退出登录</el-button>
  </div>

  <div v-else class="login-prompt">
    <p>请先登录以查看个人信息</p>
    <el-button type="primary" @click="$router.push('/login')">去登录</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import {
  Calendar,
  Timer,
  ChatDotRound,
  Bell,
  Lock,
  InfoFilled,
  ArrowRight
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const notifications = ref(true)

const loading = ref(false)

const handleLogout = async () => {
  loading.value = true
  try {
    await userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.message || '退出登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 60px;
}

.login-prompt {
  text-align: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

.login-prompt p {
  color: #909399;
  margin-bottom: 20px;
}

.user-info {
  background: #409EFF;
  color: #fff;
  padding: 30px 20px;
  text-align: center;
}

.avatar {
  margin-bottom: 15px;
}

.user-info h2 {
  margin: 0;
  font-size: 20px;
}

.user-id {
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.8;
}

.menu-list {
  padding: 20px;
}

.menu-group {
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.menu-title {
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
}

.menu-icon {
  font-size: 20px;
  margin-right: 10px;
  color: #409EFF;
}

:deep(.el-cell) {
  padding: 15px;
}

:deep(.el-cell__title) {
  font-size: 16px;
}

.logout-btn {
  width: calc(100% - 40px);
  margin: 20px;
}
</style>