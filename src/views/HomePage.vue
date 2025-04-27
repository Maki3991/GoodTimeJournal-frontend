<template>
  <div class="homepage">
    <header class="header">
      <h1 class="title">Good Time Journal</h1>
      <div class="buttons">
        <input type="text" placeholder="Searching Bar" class="search-bar" />
        <button @click="navigateToHistory">历史</button>
        <button>设置</button>
        <button class="add-button" @click="openAddEventModal">+</button>
      </div>
    </header>
    <main class="timeline-container">
      <!-- Timeline content will go here -->
      <div class="timeline-item events-right">
        <div class="date-node" @click="navigateToEveryday">2025.4.6 星期日</div>
        <div class="events">
          <div class="event-node" @click="openAddEventModal">事件1</div>
          <div class="event-node" @click="openAddEventModal">事件2</div>
          <div class="event-node" @click="openAddEventModal">事件3</div>
        </div>
      </div>
       <div class="week-separator">
        <div class="separator-node">2025年 第n周 end</div>
      </div>
      <div class="timeline-item events-left">
         <div class="events">
           <div class="event-node" @click="openAddEventModal">事件1</div>
          <div class="event-node" @click="openAddEventModal">事件2</div>
        </div>
        <div class="date-node" @click="navigateToEveryday">2025.4.5 星期六</div>
      </div>
       <div class="timeline-item events-right">
        <div class="date-node" @click="navigateToEveryday">2025.4.4 星期五</div>
         <div class="events">
           <div class="event-node" @click="openAddEventModal">事件1</div>
          <div class="event-node" @click="openAddEventModal">事件2</div>
          <div class="event-node" @click="openAddEventModal">事件3</div>
        </div>
      </div>
    </main>

    <!-- Conditionally render the modal -->
    <EventModal v-if="isModalVisible" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 导入 useRouter
import EventModal from '@/components/EventModal.vue'; // Assuming @ points to src

// 获取 router 实例
const router = useRouter();

// Logic will be added here later
const isModalVisible = ref(false);

const openAddEventModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// 添加导航到活动历史页面的函数
const navigateToHistory = () => {
  router.push({ name: 'ActivityHistory' }); // 假设路由名称为 'ActivityHistory'
};

// 添加导航到 EverydayView 页面的函数
const navigateToEveryday = () => {
  router.push({ name: 'EverydayView' });
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使 homepage 占据整个视口高度 */
  /* padding: 20px 0; */ /* Removed horizontal padding */
  box-sizing: border-box; /* 包含 padding 在内 */
  font-family: sans-serif;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*margin-bottom: 20px;*/
  margin: 0;
  padding: 15px 26px;
  border-bottom: 1px solid #ccc; /* 添加分割线 */
  box-sizing: border-box; /* Include padding for border */
  /* Added for fixed header */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f9f9f9; /* Added background for fixed element */
  z-index: 10;
}

.title {
  font-size: 2em;
  margin: 0;
}

.search-bar {
  padding: 8px 12px;
  border: 1px solid #ccc;
  font-size: 1em solid #ccc;
  width: 300px; /* 根据需要调整宽度 */
  border-radius: 4px;

}

.buttons {
  display: flex;
  align-items: center;
}

.buttons button {
  padding: 8px 15px;
  font-size: 1em;
  cursor: pointer;
  background-color: rgb(234, 234, 234); /* 灰白色背景 */
  transition: background-color 0.2s; /* 添加悬停过渡效果 */
}

.buttons button:hover {
  background-color: #e0e0e0; /* 悬停时 */
}

/* Add margin to all direct children except the first one */
.buttons > *:not(:first-child) {
  margin-left: 10px;
}

/*.add-button {
  font-size: 1.5em;
  padding: 8px 15px;
  /*width: 40px;
  height: 40px;*/
  /*border-radius: 50%;*/
  /*display: flex;
  justify-content: center;
  align-items: center;
}*/

.timeline-container {
  flex-grow: 1; /* 使时间线容器填充剩余空间 */
  display: flex;
  flex-direction: column;
  /* align-items: center; */ /* Removed: Allow items to span full width */
  overflow-y: auto; /* Added: Enable vertical scrolling */
  /* padding: 20px 0; */ /* Removed vertical padding */
  padding-top: calc(50vh - 150px); /* Added: Push first item towards center */
  position: relative;
  /* margin-top: 90px; */ /* Removed old margin */
  margin-top: 70px;
}

/* 全局中心连接线 - Re-enabled */
.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  /* top: 20px; */ /* 顶部起始位置 */
  top: calc(50vh - 125px); /* Changed: Start below the padding */
  /* bottom: 20px; */ /* 底部结束位置 */ /* Removed bottom constraint */
  height: 100vh;
  width: 2px;
  background-color: #aaa;
  transform: translateX(-50%);
  z-index: 0; 
}

/* 时间线项 */
.timeline-item {
  /* display: flex; */ /* Removed flex for absolute positioning of events */
  /* flex-direction: column; */
  /* align-items: center; */
  margin-bottom: 70px;
  position: relative;
  width: 100%;
  z-index: 1;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* 日期节点 */
.date-node {
  padding: 20px 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  white-space: nowrap;
  position: relative; /* Keep relative for stacking */
  z-index: 2; /* Ensure date node is above events if overlap happens */
  /* margin-bottom: 15px; */ /* Removed, position events absolutely */
  font-size: 1em;
  display: block;
  width: fit-content; /* Adjust width to content */
  margin-left: auto; /* Center using margin */
  margin-right: auto; /* Center using margin */
  transition: background-color 0.2s, box-shadow 0.2s; /* 添加过渡效果 */
  cursor: pointer; /* 添加指针样式 */
}

.date-node:hover {
  background-color: #e9ecef;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Position events absolutely */
.events {
  display: flex;
  position: absolute;
  top: 50%; /* Vertically center relative to timeline-item padding box */
  transform: translateY(-50%);
  z-index: 1;
  /* width: calc(50% - 70px); */ /* Removed: Allow width to be determined by content */
}

/* Events on the Left */
.timeline-item.events-left .events {
  right: calc(50% + 125px); /* Increased offset from 30px to 50px */
  justify-content: flex-end; /* Align items towards the center line */
}

/* Events on the Right */
.timeline-item.events-right .events {
  left: calc(50% + 125px); /* Increased offset from 30px to 50px */
  justify-content: flex-start; /* Align items away from the center line */
}

/* 周分割线 */
.separator-node {
  padding: 18px 35px; /* Adjusted padding for potentially smaller width */
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #eee;
  white-space: nowrap; /* Keep text on one line */
  position: relative;
  z-index: 1;
  font-size: 1em;
  display: inline-block; /* Needed for max-width to work correctly with margin auto */
  margin-left: auto;
  margin-right: auto;
  max-width: 250px; /* Added: Set a maximum width */
  overflow: hidden; /* Added: Hide overflowing content */
  text-overflow: ellipsis; /* Added: Show ellipsis for hidden text */
  /* Center align the block itself */
  display: block;
  width: fit-content; /* Keep, but max-width takes precedence */
  transition: background-color 0.2s; /* 添加过渡效果 */
  cursor: pointer; /* 添加指针样式 */
}

.separator-node:hover {
  background-color: #ddd;
}

.week-separator {
    margin-bottom: 70px; /* 保持一致的间距 */
    /* 移除特定样式，统一由 timeline-item 处理 */
}

/* 事件节点 */
.event-node {
  padding: 10px 32px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  margin: 0 35px; /* Increased horizontal margin from 5px to 8px */
  white-space: nowrap;
  position: relative; /* Needed for pseudo-elements */
  transition: background-color 0.2s, border-color 0.2s; /* 添加过渡效果 */
  cursor: pointer; /* 添加指针样式 */
}

.event-node:hover {
  background-color: #f5f5f5;
  border-color: #bbb;
}

/* 连接线: 事件 <--> 事件 */
.events-right .event-node:not(:last-child)::after,
.events-left .event-node:not(:first-child)::before {
    content: '';
    position: absolute;
    top: 50%;
    height: 2px;
    background-color: #ccc;
    width: 70px; /* Width should be double the margin (35px * 2) */
    transform: translateY(-50%);
    z-index: -1; /* Behind the event node */
}

.events-right .event-node:not(:last-child)::after {
    left: 100%; /* Line extends to the right */
}

.events-left .event-node:not(:first-child)::before {
    right: 100%; /* Line extends to the left */
}

/* 连接线: 日期 <--> 事件组 */
.timeline-item.events-right .date-node::after,
.timeline-item.events-left .date-node::before {
  content: '';
  position: absolute;
  top: 50%;
  height: 2px;
  background-color: #ccc;
  width: 77px; /* Reduced width from 100px */
  transform: translateY(-50%);
  z-index: 1;
}
.timeline-item.events-right .date-node::after {
  left: 100%; /* Line extends to the right */
}
.timeline-item.events-left .date-node::before {
  right: 100%; /* Line extends to the left */
}

/* Scoped styles can be added here later if needed */
</style> 