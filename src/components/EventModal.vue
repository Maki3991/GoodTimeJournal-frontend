<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-left">
          <input type="text" v-model="eventTitle" class="modal-title-input" placeholder="输入事件标题">
          <input
            type="text"
            v-model="eventDate"
            class="modal-date-input"
            :class="{ 'invalid-date': !isDateValid }" 
            placeholder="xxxx年xx月xx日">
        </div>
        <div class="header-right">
          <button class="header-button confirm-button">✓</button>
          <button class="header-button close-button" @click="close">✕</button>
        </div>
      </div>
      <div class="modal-scrollable-content">
        <div class="event-description">
          <textarea placeholder="输入新的事件"></textarea>
        </div>
        <hr class="separator">
        <div class="sliders">
          <div class="slider-group">
            <label for="engagement">投入值</label>
            <input type="range" id="engagement" name="engagement" min="0" max="100" v-model.number="engagementValue">
            <span class="slider-value">{{ engagementValue }}%</span>
          </div>
          <div class="slider-group">
            <label for="energy">能量值</label>
            <input type="range" id="energy" name="energy" min="0" max="100" v-model.number="energyValue">
            <span class="slider-value">{{ energyValue }}%</span>
          </div>
        </div>
        <div class="aeiou-section">
          <div class="aeiou-labels">
             <label>A</label>
             <label>E</label>
             <label>I</label>
             <label>O</label>
             <label>U</label>
          </div>
          <div class="aeiou-inputs">
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Define the events this component can emit
const emit = defineEmits(['close']);

// --- Reactive state for title and date ---
const eventTitle = ref('添加新的事件');

// --- Get and format current date ---
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, pad with 0
const day = String(today.getDate()).padStart(2, '0');      // Pad day with 0
const formattedDate = `${year}年${month}月${day}日`;

const eventDate = ref(formattedDate); // Use formatted current date as initial value
const isDateValid = ref(true); // Assume valid initially

// --- Reactive state for sliders ---
const engagementValue = ref(0);
const energyValue = ref(0);

// --- Watcher for date validation ---
const dateFormatRegex = /^\d{4}年\d{1,2}月\d{1,2}日$/;
watch(eventDate, (newValue) => {
  isDateValid.value = dateFormatRegex.test(newValue);
});
// Optional: Validate initial value
isDateValid.value = dateFormatRegex.test(eventDate.value);

// Function to emit the close event
const close = () => {
  emit('close');
};

// Logic will be added here later
// TODO: Add props for date, event data
// TODO: Add refs for form inputs
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 25px;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
}

.header-left {
  flex-grow: 1;
  margin-right: 15px;
  text-align: left;
}

.modal-title-input,
.modal-date-input {
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  padding: 2px 0;
  margin: 0;
  box-sizing: border-box;
}

.modal-title-input {
  font-size: 1.3em;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.modal-date-input {
  font-size: 0.9em;
  color: #555;
  transition: border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.modal-date-input.invalid-date {
  border-bottom: 1px solid #dc3545;
  color: #dc3545;
}

.modal-date-input:focus {
  border-bottom: 1px solid #6c757d;
}

.modal-date-input.invalid-date:focus {
  border-bottom: 1px solid #dc3545;
}

.header-right {
    display: flex;
    gap: 10px;
}

.header-button {
  background-color: #f0f0f0;
  /*border: 1px solid #ccc;*/
  /*border-radius: 50%;*/
  width: 32px;
  height: 32px;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;
  box-sizing: border-box;
}

.header-button:hover {
  background-color: #e0e0e0;
}

.confirm-button {
  /*color: #28a745;*/
  /*border-color: #bbb;*/
}

.close-button {
   /*color: #dc3545;*/
   /*border-color: #bbb;*/
}

.modal-scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px 25px;
}

.event-description textarea {
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-sizing: border-box;
  font-size: 1em;
  margin-bottom: 20px;
}

.separator {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.sliders {
  margin-bottom: 25px;
}

.slider-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.slider-group label {
  width: 55px;
  margin-right: 15px;
  font-size: 0.95em;
  color: #444;
  white-space: nowrap;
}

.slider-group input[type="range"] {
  flex-grow: 1;
  margin-right: 15px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  height: 8px;
  background: #e9ecef;
  border-radius: 5px;
  outline: none;
}

.slider-group input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #6c757d;
  border-radius: 50%;
  cursor: pointer;
}

.slider-group input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #6c757d;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.slider-value {
  width: 45px;
  text-align: right;
  font-size: 0.9em;
  color: #555;
  font-weight: 500;
}

.aeiou-section {
  margin-top: 25px;
}

.aeiou-labels {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    padding: 0 5px;
}

.aeiou-labels label {
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
    width: 18%;
    text-align: center;
}

.aeiou-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.aeiou-inputs input[type="text"] {
  width: 18%;
  padding: 10px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.95em;
}

</style>