/<template>
  <div class="activity-history">
    <header class="header">
      <h1 class="title">活动历史</h1>
      <div class="header-controls">
        <div class="search-bar-container">
          <input type="text" class="search-bar" placeholder="Searching Bar" />
        </div>
        <button class="close-button" @click="goBackToHome">✕</button>
      </div>
    </header>
    <div class="calendar-container">
      <div class="weekdays">
        <div class="weekday">周日</div>
        <div class="weekday">周一</div>
        <div class="weekday">周二</div>
        <div class="weekday">周三</div>
        <div class="weekday">周四</div>
        <div class="weekday">周五</div>
        <div class="weekday">周六</div>
      </div>
      <div class="calendar-grid">
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">30</span>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">31</span>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">4月1日</span>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">2</span>
          <div class="event-item" @click.stop="openEventModal"></div>
          <div class="event-item" @click.stop="openEventModal"></div>
          <div class="event-item" @click.stop="openEventModal"></div>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">3</span>
          <div class="event-item" @click.stop="openEventModal"></div>
          <div class="event-item" @click.stop="openEventModal"></div>
          <div class="event-item" @click.stop="openEventModal"></div>
          <span class="more-indicator">...</span>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">4</span>
          <div class="event-item" @click.stop="openEventModal"></div>
          <div class="event-item" @click.stop="openEventModal"></div>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView">
          <span class="date-number">5</span>
        </div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">6</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">7</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">8</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">9</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">10</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">11</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">12</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">13</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">14</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">15</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">16</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">17</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">18</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">19</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">20</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">21</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">22</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">23</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">24</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">25</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">26</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">27</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">28</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">29</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">30</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">5月1日</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">2</span></div>
        <div class="calendar-cell" @click="navigateToEverydayView"><span class="date-number">3</span></div>
      </div>
    </div>
    <!-- 弹窗 -->
    <EventModal v-if="isModalVisible" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import EventModal from '../components/EventModal.vue';

const router = useRouter();

// 控制弹窗显示
const isModalVisible = ref(false);

const openEventModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Logic for fetching and displaying events will go here

const goBackToHome = () => {
  router.back();
};

const navigateToEverydayView = () => {
  // TODO: Pass the actual date of the clicked cell
  router.push({ name: 'EverydayView' });
};
</script>

<style scoped>
.activity-history {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0px;
  font-family: sans-serif;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  /*padding-bottom: 10px;*/
  padding: 15px 26px;

  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  width: 1189.34px;
  height: 68.667px;
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: #f9f9f9;
}
.title {
  font-size: 2em;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  font-size: 1em solid #ccc;;
}

.close-button {
  padding: 8px 15px;
  font-size: 1em;
  cursor: pointer;
  background-color: rgb(234, 234, 234);
  transition: background-color 0.2s;
  border: none;
  border-radius: 4px;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.calendar-container {
  margin-top: 66px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #ccc;
  margin-bottom: -1px;
}

.weekday {
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top:40px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: none;
  border-radius: 8px;
  flex-grow: 1;
  overflow: hidden; 
  box-shadow: inset 1px 0 0 #ccc,
              inset -1px 0 0 #ccc;
}

.calendar-cell {
  background-color: #fff;
  padding: 5px;
  min-height: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  justify-content: flex-end;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.calendar-cell:hover {
  background-color: #f9f9f9;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
}

.calendar-cell:nth-child(7n) {
  border-right: none;
}

.date-number {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.8em;
  color: #888;
}

.event-item {
  background-color: #e0e0e0;
  border-radius: 4px;
  height: 18px;
  margin-top: 10px;
  width: 90%;
  transition: background-color 0.2s;
  cursor: pointer;
}

.event-item:hover {
  background-color: #d0d0d0;
}

.more-indicator {
  align-self: flex-start;
  font-size: 1em;
  color: #555;
  padding-bottom: 5px;
}
</style> 