import { ref } from 'vue'

// 从localStorage获取收藏列表，如果没有则初始化为空数组
const getFavorites = () => {
  const favoritesStr = localStorage.getItem('favorites')
  return favoritesStr ? JSON.parse(favoritesStr) : []
}

// 创建响应式的收藏列表
export const favorites = ref(getFavorites())

// 添加收藏
export const addFavorite = (institution) => {
  if (!favorites.value.some(item => item.id === institution.id)) {
    favorites.value.push(institution)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
}

// 取消收藏
export const removeFavorite = (institutionId) => {
  favorites.value = favorites.value.filter(item => item.id !== institutionId)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

// 检查是否已收藏
export const isFavorite = (institutionId) => {
  return favorites.value.some(item => item.id === institutionId)
}