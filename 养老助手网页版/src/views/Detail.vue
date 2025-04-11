<template>
  <div class="detail-page">
    <div class="header">
      <el-icon class="back-icon" @click="$router.back()"><ArrowLeft /></el-icon>
      <div class="rating">
        <el-rate v-model="institution.rating" disabled />
        <span>{{ institution.rating }}</span>
      </div>
    </div>

    <div class="institution-info">
      <h1>{{ institution.name }}</h1>
      <div class="tag">{{ institution.type }}</div>

      <div class="basic-info">
        <h2>机构介绍</h2>
        <p>{{ institution.description }}</p>

        <h3>基本信息</h3>
        <div class="info-item">
          <span class="label">地址</span>
          <span>{{ institution.address }}</span>
        </div>
        <div class="info-item">
          <span class="label">电话</span>
          <span>{{ institution.phone }}</span>
        </div>
        <div class="info-item">
          <span class="label">价格</span>
          <span class="price">¥{{ institution.price }}/月</span>
        </div>
        <div class="info-item">
          <span class="label">床位</span>
          <span>剩余{{ institution.beds }}张</span>
        </div>
      </div>

      <div class="facilities">
        <h2>设施服务</h2>
        <div class="facility-grid">
          <div class="facility-item" v-for="(facility, index) in institution.facilities" :key="index">
            <el-icon><component :is="facility.icon" /></el-icon>
            <span>{{ facility.name }}</span>
          </div>
        </div>
      </div>

      <div class="reviews">
        <h2>用户评价 ({{ institution.reviews.length }})</h2>
        <div class="rating-overview">
          <div class="overall">
            <div class="score">{{ institution.rating }}</div>
            <el-rate v-model="institution.rating" disabled />
          </div>
          <div class="rating-items">
            <div class="rating-item">
              <span>环境</span>
              <el-rate v-model="institution.environmentRating" disabled />
              <span>{{ institution.environmentRating }}</span>
            </div>
            <div class="rating-item">
              <span>服务</span>
              <el-rate v-model="institution.serviceRating" disabled />
              <span>{{ institution.serviceRating }}</span>
            </div>
            <div class="rating-item">
              <span>设施</span>
              <el-rate v-model="institution.facilityRating" disabled />
              <span>{{ institution.facilityRating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <el-button type="primary" class="book-btn">一键预约</el-button>
      <el-button type="success" class="nav-btn">导航前往</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeft, First, Food, VideoPlay, Service, WashingMachine, Bicycle } from '@element-plus/icons-vue'

const institution = ref({
  name: '康乐老年护理中心',
  type: '医养结合',
  rating: 4.8,
  description: '康乐老年护理中心成立于2015年，位于石家庄市裕华区，是一家医养结合的综合性养老机构。占地面积5000平方米，拥有床位200张，配备专业医护团队24小时服务。',
  address: '裕华区槐安东路123号',
  phone: '16630134340',
  price: '2500-4500',
  beds: '125',
  environmentRating: 4.7,
  serviceRating: 4.9,
  facilityRating: 4.6,
  facilities: [
    { name: '医疗护理', icon: 'First' },
    { name: '营养膳食', icon: 'Food' },
    { name: '娱乐活动', icon: 'VideoPlay' },
    { name: '洗衣服务', icon: 'WashingMachine' },
    { name: '康复训练', icon: 'Bicycle' },
    { name: '无线网络', icon: 'Service' }
  ],
  reviews: []
})
</script>

<style scoped>
.detail-page {
  padding-bottom: 80px;
}

.header {
  position: relative;
  height: 200px;
  background: linear-gradient(to bottom, #409EFF, #79bbff);
  color: #fff;
  display: flex;
  align-items: flex-start;
  padding: 20px;
}

.back-icon {
  font-size: 24px;
  cursor: pointer;
}

.rating {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.institution-info {
  margin-top: -50px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin: 0 0 10px;
}

.tag {
  display: inline-block;
  background: #409EFF;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 20px;
}

.basic-info {
  margin-bottom: 30px;
}

h2 {
  font-size: 18px;
  margin: 0 0 15px;
  color: #333;
}

h3 {
  font-size: 16px;
  margin: 20px 0 10px;
  color: #666;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
}

.label {
  color: #909399;
  width: 60px;
}

.price {
  color: #F56C6C;
  font-weight: bold;
}

.facilities {
  margin-bottom: 30px;
}

.facility-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.facility-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: #666;
}

.facility-item .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.reviews {
  margin-bottom: 30px;
}

.rating-overview {
  background: #f5f7fa;
  border-radius: 10px;
  padding: 20px;
}

.overall {
  text-align: center;
  margin-bottom: 20px;
}

.score {
  font-size: 36px;
  font-weight: bold;
  color: #F56C6C;
  margin-bottom: 5px;
}

.rating-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
}

.book-btn,
.nav-btn {
  flex: 1;
  height: 40px;
}
</style>