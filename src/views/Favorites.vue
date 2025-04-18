<template>
  <div class="favorites-page">
    <div class="header">
      <h1>我的收藏</h1>
    </div>

    <div class="favorites-list">
      <div v-for="item in favorites" :key="item.id" class="institution-card">
        <div class="card-tag" :class="item.type === '公办' ? 'public' : item.type === '公建民营' ? 'mixed' : 'private'">
          {{ item.type }}
        </div>
        <h3>{{ item.name }}</h3>
        <div class="location">
          <i class="el-icon-location"></i>
          {{ item.district }}
        </div>
        <div class="info">
          <div class="rating">
            <i class="el-icon-star-on"></i>
            {{ item.rating }}
          </div>
          <div class="operation-status" :class="item.operationStatus === '运营中' ? 'operating' : 'not-operating'">
            {{ item.operationStatus }}
          </div>
        </div>
        <div class="price" v-if="item.price">
          ¥{{ item.price }}/月
        </div>
        <div class="price" v-else>
          暂无价格信息
        </div>
        <div class="action-buttons">
          <el-button type="primary" size="small" @click="viewDetail(item.id)">查看详情</el-button>
          <el-button type="danger" size="small" @click="removeFavorite(item.id)">取消收藏</el-button>
        </div>
      </div>

      <div v-if="favorites.length === 0" class="empty-state">
        <el-empty description="暂无收藏的机构" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { favorites, removeFavorite } from '../data/favorites'
import { useRouter } from 'vue-router'

const router = useRouter()

const viewDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
.favorites-page {
  padding: 20px;
  padding-bottom: 80px;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #409EFF;
  margin: 0;
}

.favorites-list {
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

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-buttons .el-button {
  flex: 1;
}

.empty-state {
  margin-top: 100px;
}
</style>