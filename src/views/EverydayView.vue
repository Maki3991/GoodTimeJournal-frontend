<template>
  <div class="everyday-view">
    <header class="everyday-header">
      <h1>{{ formattedDate }}</h1>
      <button class="close-button" @click="closeView">✕</button>
    </header>
    <main class="everyday-grid">
      <div v-for="event in events" :key="event.id" class="event-card" @click="openEvent(event)">
        <div class="event-content">
          <h2>{{ event.title }}</h2>
          <p>{{ event.description }}</p>
        </div>
        <div class="event-stats">
          <span>投入值: {{ event.investment }}%</span>
          <span>能量值: {{ event.energy }}%</span>
        </div>
      </div>
    </main>
    <!-- 弹窗 -->
    <EventModal v-if="isModalVisible" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import EventModal from '../components/EventModal.vue'; // 使用相对路径导入

// 假设从路由参数或状态管理获取日期
const currentDate = ref(new Date(2025, 3, 5)); // 示例日期：2025年4月5日

const formattedDate = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1; // 月份从0开始
  const day = currentDate.value.getDate();
  return `${year}年${month}月${day}日`;
});

// 假设的事件数据结构
interface EventItem {
  id: number;
  title: string;
  description: string;
  investment: number;
  energy: number;
}

// 假设的事件数据，实际应从API或状态管理获取
const events = ref<EventItem[]>([
  {
    id: 1,
    title: '事件1',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
    investment: 70,
    energy: 80,
  },
  {
    id: 2,
    title: '事件2',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
    investment: 70,
    energy: 80,
  },
  {
    id: 3,
    title: '事件3',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
    investment: 70,
    energy: 80,
  },
  // ...更多事件
]);

const router = useRouter();

// 控制弹窗显示的响应式变量
const isModalVisible = ref(false);

const openEvent = (event: EventItem) => {
  console.log(`打开事件: ${event.id}`);
  isModalVisible.value = true; // 打开弹窗
  // 之前的导航逻辑被注释掉了，可以根据需要保留或移除
  // router.push({ name: 'EventEdit', params: { id: event.id } });
};

const closeModal = () => {
  isModalVisible.value = false; // 关闭弹窗
};

const closeView = () => {
  // 返回上一页
  if (window.history.length > 1) {
    router.back();
  } else {
    // 如果没有历史记录，可以导航到默认页面，例如主页
    router.push({ name: 'Homepage' }); // 假设主页路由名称为 Homepage
  }
};
</script>

<style scoped>
.everyday-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* border: 1px solid #ccc; 草图中的外框 */
  font-family: sans-serif;
}

.everyday-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 26px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box; 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.everyday-header h1 {
  margin: 0;
  font-size: 2em;
}

.close-button {
  background-color: rgb(234, 234, 234);
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  font-size: 1em;
  padding: 8px 15px;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.buttons > *:not(:first-child) {
  margin-left: 10px;
}

.everyday-grid {
  flex-grow: 1;
  padding: 20px;
  padding-top: 85px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  overflow-y: auto;
  background-color: #fff;
}

.event-card {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.event-card:hover {
  transform: translateY(-3px);
}

.event-content {
  flex-grow: 1;
  margin-right: 20px;
}

.event-card h2 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 2.2em;
}

.event-card p {
  margin-bottom: 0;
  color: #555;
  line-height: 1.4;
  word-break: break-all;
}

.event-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  font-size: 0.9em;
  color: #333;
  flex-shrink: 0;
}
</style> 