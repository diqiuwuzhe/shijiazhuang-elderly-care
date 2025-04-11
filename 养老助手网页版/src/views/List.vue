<template>
  <div class="list-page">
    <div class="filter-tabs">
      <el-tabs v-model="activeArea" class="area-tabs">
        <el-tab-pane label="全部区域" name="all"></el-tab-pane>
        <el-tab-pane label="长安区" name="长安区"></el-tab-pane>
        <el-tab-pane label="桥西区" name="桥西区"></el-tab-pane>
        <el-tab-pane label="裕华区" name="裕华区"></el-tab-pane>
        <el-tab-pane label="新华区" name="新华区"></el-tab-pane>
      </el-tabs>

      <div class="sort-options">
        <el-radio-group v-model="sortType" size="small">
          <el-radio-button label="smart">智能排序</el-radio-button>
          <el-radio-button label="distance">距离最近</el-radio-button>
          <el-radio-button label="price">价格最低</el-radio-button>
          <el-radio-button label="rating">评分最高</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="institution-list">
      <div v-for="item in filteredInstitutions" :key="item.id" class="institution-card" @click="$router.push(`/detail/${item.id}`)">
        <div class="card-tag" :class="item.type === '公办' ? 'public' : item.type === '医养结合' ? 'medical' : 'private'">{{ item.type }}</div>
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
</template>

<script setup>
import { ref, computed } from 'vue'

const activeArea = ref('all')
const sortType = ref('smart')

const institutions = ref([
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
  },
  {
    id: 3,
    name: '夕阳红养老院',
    district: '桥西区',
    type: '民办',
    rating: 4.5,
    distance: 3.1,
    price: '1800-3500'
  }
])

const filteredInstitutions = computed(() => {
  let result = [...institutions.value]
  
  // 区域筛选
  if (activeArea.value !== 'all') {
    result = result.filter(item => item.district === activeArea.value)
  }

  // 排序
  switch (sortType.value) {
    case 'distance':
      result.sort((a, b) => a.distance - b.distance)
      break
    case 'price':
      result.sort((a, b) => parseInt(a.price.split('-')[0]) - parseInt(b.price.split('-')[0]))
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      // 智能排序：综合考虑距离、价格和评分
      result.sort((a, b) => {
        const scoreA = (5 - a.distance) + (5 - parseInt(a.price.split('-')[0])/1000) + a.rating
        const scoreB = (5 - b.distance) + (5 - parseInt(b.price.split('-')[0])/1000) + b.rating
        return scoreB - scoreA
      })
  }

  return result
})
</script>

<style scoped>
.list-page {
  padding: 0 0 60px;
}

.filter-tabs {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.area-tabs {
  margin-bottom: 10px;
}

.sort-options {
  padding: 0 10px;
  margin-bottom: 10px;
  overflow-x: auto;
  white-space: nowrap;
}

.institution-list {
  padding: 15px;
}

.institution-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  margin-bottom: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.card-tag.public {
  background: #67C23A;
}

.card-tag.medical {
  background: #409EFF;
}

.card-tag.private {
  background: #909399;
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

:deep(.el-tabs__nav) {
  width: 100%;
  display: flex;
}

:deep(.el-tabs__item) {
  flex: 1;
  text-align: center;
}

:deep(.el-radio-group) {
  display: flex;
  width: 100%;
}

:deep(.el-radio-button) {
  flex: 1;
}

:deep(.el-radio-button__inner) {
  width: 100%;
}
</style>