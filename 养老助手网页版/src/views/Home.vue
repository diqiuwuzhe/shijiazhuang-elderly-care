<template>
  <div class="home">
    <div class="header">
      <h1>石家庄养老服务</h1>
      <div class="search-box">
        <el-input
          v-model="searchText"
          placeholder="搜索养老机构名称"
          :prefix-icon="Search"
        />
      </div>
    </div>

    <div class="feature-grid">
      <div class="feature-item" @click="$router.push('/list')">
        <el-icon class="icon"><HomeFilled /></el-icon>
        <span>机构查询</span>
      </div>
      <div class="feature-item" @click="$router.push('/list?sort=distance')">
        <el-icon class="icon"><Location /></el-icon>
        <span>附近机构</span>
      </div>
      <div class="feature-item" @click="$router.push('/list?sort=price')">
        <el-icon class="icon"><Discount /></el-icon>
        <span>价格优惠</span>
      </div>
      <div class="feature-item" @click="$router.push('/list?sort=rating')">
        <el-icon class="icon"><Star /></el-icon>
        <span>优质推荐</span>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>附近养老机构</h2>
        <el-link @click="$router.push('/list')">查看更多 ></el-link>
      </div>
      <div class="institution-list">
        <div class="institution-card" v-for="item in nearbyInstitutions" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
          <div class="card-tag">{{ item.type }}</div>
          <h3>{{ item.name }}</h3>
          <div class="location">{{ item.district }}</div>
          <div class="info">
            <el-rate v-model="item.rating" disabled text-color="#ff9900" />
            <span class="distance">距离{{ item.distance }}km</span>
          </div>
          <div class="price">¥{{ item.price }}/月</div>
          <el-button type="primary" class="contact-btn">一键预约</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, HomeFilled, Location, Discount, Star } from '@element-plus/icons-vue'

const searchText = ref('')

const nearbyInstitutions = ref([
  {
    id: 1,
    name: '石家庄市老年公寓',
    district: '长安区',
    type: '公办',
    rating: 4.2,
    distance: 1.2,
    price: '1500-3000'
  },
  {
    id: 2,
    name: '康乐老年护理中心',
    district: '裕华区',
    type: '医养结合',
    rating: 4.8,
    distance: 2.5,
    price: '2500-4500'
  }
])
</script>

<style scoped>
.home {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  color: #409EFF;
  font-size: 24px;
  margin-bottom: 15px;
}

.search-box {
  margin: 0 auto;
  max-width: 500px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.feature-item {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.feature-item .icon {
  font-size: 32px;
  color: #409EFF;
  margin-bottom: 10px;
}

.feature-item span {
  display: block;
  color: #333;
  font-size: 14px;
}

.section {
  margin-top: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h2 {
  font-size: 18px;
  margin: 0;
}

.institution-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.institution-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #909399;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.institution-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.location {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.distance {
  color: #909399;
  font-size: 14px;
}

.price {
  color: #F56C6C;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.contact-btn {
  width: 100%;
}
</style>