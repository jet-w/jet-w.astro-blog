<template>
  <div class="study-calendar">
    <!-- 头部导航 -->
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-btn">&lt;</button>
      <h2 class="month-title">{{ currentYear }} 年 {{ currentMonthName }}</h2>
      <button @click="nextMonth" class="nav-btn">&gt;</button>
    </div>

    <!-- 阶段标签 -->
    <div class="phase-tags">
      <span
        v-for="phase in parsedPhases"
        :key="phase.id"
        class="phase-tag"
        :style="{ backgroundColor: phase.color }"
      >
        {{ phase.name }} ({{ phase.weeks }}周)
      </span>
    </div>

    <!-- 星期头 -->
    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>

    <!-- 日历网格 -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-day"
        :class="{
          'other-month': !day.currentMonth,
          'today': day.isToday,
          'has-task': day.tasks.length > 0,
          'past-day': isPastDay(day) && day.tasks.length > 0
        }"
        :style="day.tasks.length ? { borderLeft: `4px solid ${day.tasks[0].color}` } : {}"
        @click="selectDay(day)"
      >
        <span class="day-number">{{ day.date }}</span>
        <div class="day-tasks">
          <div
            v-for="task in day.tasks.slice(0, 2)"
            :key="task.id"
            class="task-item"
            :style="{ backgroundColor: task.color + '20', color: task.color }"
          >
            {{ task.title }}
          </div>
          <div v-if="day.tasks.length > 2" class="more-tasks">
            +{{ day.tasks.length - 2 }} 更多
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗遮罩 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>

        <div class="modal-header">
          <h3>{{ selectedDay?.fullDate }}</h3>
          <span
            v-if="selectedDay && getDayStatus(selectedDay)"
            class="day-status"
            :class="getDayStatus(selectedDay)"
          >
            {{ getDayStatus(selectedDay) === 'completed' ? '已完成' : getDayStatus(selectedDay) === 'today' ? '今日任务' : '待完成' }}
          </span>
          <span
            v-if="selectedDay && selectedDay.tasks.length > 0 && selectedDay.tasks[0].isCustomDate"
            class="custom-date-badge"
          >
            📌 自定义
          </span>
        </div>

        <div v-if="!selectedDay || selectedDay.tasks.length === 0" class="no-tasks">
          <div class="no-tasks-icon">📅</div>
          <p>暂无学习任务</p>
          <p class="no-tasks-hint">这是休息日，好好放松一下吧！</p>
        </div>

        <div v-else class="task-list">
          <div
            v-for="(task, taskIndex) in selectedDay.tasks"
            :key="task.id"
            class="task-detail"
            :style="{ borderLeft: `4px solid ${task.color}` }"
          >
            <div class="task-header">
              <span class="task-phase" :style="{ color: task.color }">{{ task.phase }}</span>
              <span class="task-duration">⏱️ {{ task.duration }}</span>
            </div>
            <div class="task-title">{{ task.title }}</div>
            <div class="task-desc">{{ task.description }}</div>
            <div v-if="task.materials" class="task-materials">
              <span class="materials-icon">📚</span>
              <span>{{ task.materials }}</span>
            </div>

            <!-- 练习详情列表 -->
            <div v-if="task.exercises && task.exercises.length > 0" class="exercises-section">
              <div class="exercises-header">📝 今日练习</div>
              <div class="exercises-list">
                <div
                  v-for="(exercise, exIndex) in task.exercises"
                  :key="exIndex"
                  class="exercise-item"
                  :class="{ completed: isExerciseCompleted(selectedDay, taskIndex, exIndex) }"
                >
                  <span class="exercise-status">
                    {{ isExerciseCompleted(selectedDay, taskIndex, exIndex) ? '✅' : '⬜' }}
                  </span>
                  <span class="exercise-type" :style="{ backgroundColor: task.color + '20', color: task.color }">
                    {{ exercise.type }}
                  </span>
                  <span class="exercise-name">{{ exercise.name }}</span>
                  <span class="exercise-quantity">
                    <span class="quantity-done">{{ getExerciseDone(selectedDay, taskIndex, exIndex) }}</span>
                    <span class="quantity-sep">/</span>
                    <span class="quantity-total">{{ exercise.quantity }} {{ exercise.unit }}</span>
                  </span>
                </div>
              </div>
              <!-- 总体完成进度 -->
              <div class="task-progress-bar">
                <div class="progress-label">
                  完成进度: {{ getTaskCompletionPercent(selectedDay, taskIndex) }}%
                </div>
                <div class="progress-track">
                  <div
                    class="progress-fill"
                    :style="{
                      width: getTaskCompletionPercent(selectedDay, taskIndex) + '%',
                      backgroundColor: task.color
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 整体完成状态（无练习详情时显示） -->
            <div v-else class="task-completion-status">
              <span v-if="isTaskCompleted(selectedDay, taskIndex)" class="status-completed">
                ✅ 已完成
              </span>
              <span v-else class="status-pending">
                ⬜ 待完成
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习统计 -->
    <div class="study-stats">
      <div class="stat-item">
        <span class="stat-value">{{ totalDays }}</span>
        <span class="stat-label">总天数</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ studyDaysCount }}</span>
        <span class="stat-label">学习日</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ restDaysCount }}</span>
        <span class="stat-label">休息日</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ progressPercent }}%</span>
        <span class="stat-label">进度</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Props 定义
const props = defineProps({
  // 学习阶段配置
  phases: {
    type: Array,
    default: () => [
      { id: 1, name: '基础阶段', color: '#10b981', weeks: 4 },
      { id: 2, name: '强化阶段', color: '#3b82f6', weeks: 4 },
      { id: 3, name: '冲刺阶段', color: '#f59e0b', weeks: 4 },
    ]
  },
  // 学习计划配置
  studyPlan: {
    type: Object,
    default: () => ({
      // 阶段1的任务
      phase1: {
        weekday: [
          { title: '任务1', duration: '1小时', description: '描述1', materials: '资料1' },
        ],
        weekend: [
          { title: '周末任务', duration: '2小时', description: '周末描述', materials: '周末资料' },
        ]
      },
      phase2: {
        weekday: [
          { title: '任务2', duration: '1.5小时', description: '描述2', materials: '资料2' },
        ],
        weekend: [
          { title: '周末任务', duration: '3小时', description: '周末描述', materials: '周末资料' },
        ]
      },
      phase3: {
        weekday: [
          { title: '任务3', duration: '2小时', description: '描述3', materials: '资料3' },
        ],
        weekend: [
          { title: '周末任务', duration: '3小时', description: '周末描述', materials: '周末资料' },
        ]
      }
    })
  },
  // 开始日期（默认今天）
  startDate: {
    type: String,
    default: ''
  },
  // 按日期精确配置（优先级高于周配置）
  // 格式: { 'YYYY-MM-DD': { title, duration, description, materials, exercises } }
  dateConfig: {
    type: Object,
    default: () => ({})
  },
  // 标题
  title: {
    type: String,
    default: '学习日历'
  }
});

// 解析阶段配置
const parsedPhases = computed(() => {
  return props.phases.map((phase, index) => ({
    ...phase,
    id: phase.id || index + 1
  }));
});

// 计算总天数
const totalDays = computed(() => {
  return parsedPhases.value.reduce((sum, phase) => sum + (phase.weeks || 0) * 7, 0);
});

// 星期
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 当前日期
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDay = ref(null);
const showModal = ref(false);

// 检查任务是否已完成（用于没有exercises的任务）
function isTaskCompleted(day, taskIndex) {
  if (!day) return false;
  const task = day.tasks[taskIndex];
  if (!task) return false;

  // 如果有 exercises，检查是否全部完成
  if (task.exercises && task.exercises.length > 0) {
    return task.exercises.every((ex, exIndex) => {
      const done = getExerciseDone(day, taskIndex, exIndex);
      return done >= ex.quantity;
    });
  }

  // 没有 exercises，检查任务的 completed 字段
  return task.completed === true;
}

// 检查单个练习是否已完成
function isExerciseCompleted(day, taskIndex, exIndex) {
  if (!day) return false;
  const task = day.tasks[taskIndex];
  if (!task || !task.exercises || !task.exercises[exIndex]) return false;

  const done = getExerciseDone(day, taskIndex, exIndex);
  return done >= task.exercises[exIndex].quantity;
}

// 获取练习完成数量（从 exercises 的 completed 字段读取）
function getExerciseDone(day, taskIndex, exIndex) {
  if (!day) return 0;
  const task = day.tasks[taskIndex];
  if (!task || !task.exercises || !task.exercises[exIndex]) return 0;

  const exercise = task.exercises[exIndex];
  return exercise.completed || 0;
}

// 计算任务完成百分比
function getTaskCompletionPercent(day, taskIndex) {
  if (!day) return 0;
  const task = day.tasks[taskIndex];
  if (!task || !task.exercises || task.exercises.length === 0) return 0;

  let totalQuantity = 0;
  let totalDone = 0;

  task.exercises.forEach((exercise, exIndex) => {
    totalQuantity += exercise.quantity;
    totalDone += getExerciseDone(day, taskIndex, exIndex);
  });

  if (totalQuantity === 0) return 0;
  return Math.round((totalDone / totalQuantity) * 100);
}

// 检查是否是过去的日期
function isPastDay(day) {
  if (!day || !day.dateObj) return false;
  const dayDate = new Date(day.dateObj);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  dayDate.setHours(0, 0, 0, 0);
  return dayDate < todayDate;
}

// 获取日期状态
function getDayStatus(day) {
  if (!day || day.tasks.length === 0) return null;

  const dayDate = new Date(day.dateObj);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  dayDate.setHours(0, 0, 0, 0);

  // 检查是否所有任务都完成
  let allCompleted = true;
  day.tasks.forEach((task, taskIndex) => {
    if (task.exercises && task.exercises.length > 0) {
      // 有练习详情，检查每个练习
      if (getTaskCompletionPercent(day, taskIndex) < 100) {
        allCompleted = false;
      }
    } else {
      // 无练习详情，检查任务整体
      if (!isTaskCompleted(day, taskIndex)) {
        allCompleted = false;
      }
    }
  });

  if (allCompleted) return 'completed';
  if (dayDate.getTime() === todayDate.getTime()) return 'today';
  if (dayDate < todayDate) return 'pending';
  return 'future';
}

// 打开弹窗
function openModal(day) {
  selectedDay.value = day;
  showModal.value = true;
  document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
  showModal.value = false;
  document.body.style.overflow = '';
}

// 备考开始日期
const planStartDate = computed(() => {
  if (props.startDate) {
    const date = new Date(props.startDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  const date = new Date(today);
  date.setHours(0, 0, 0, 0);
  return date;
});

// 月份名称
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'];

const currentMonthName = computed(() => monthNames[currentMonth.value]);

// 获取阶段信息
function getPhaseInfo(weekNumber) {
  let accumulatedWeeks = 0;
  for (let i = 0; i < parsedPhases.value.length; i++) {
    const phase = parsedPhases.value[i];
    accumulatedWeeks += phase.weeks || 0;
    if (weekNumber <= accumulatedWeeks) {
      return {
        phase: phase,
        phaseIndex: i + 1,
        phaseName: phase.name,
        color: phase.color
      };
    }
  }
  return null;
}

// 格式化日期为 YYYY-MM-DD
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 生成任务
function generateTasks(date) {
  const tasks = [];
  const daysDiff = Math.floor((date - planStartDate.value) / (1000 * 60 * 60 * 24));

  // 检查是否在备考范围内
  if (daysDiff < 0 || daysDiff >= totalDays.value) return tasks;

  const weekNumber = Math.floor(daysDiff / 7) + 1;
  const phaseInfo = getPhaseInfo(weekNumber);
  if (!phaseInfo) return tasks;

  // 检查日期配置
  const dateKey = formatDateKey(date);
  const hasDateConfig = props.dateConfig && Object.keys(props.dateConfig).length > 0;
  const dateTask = props.dateConfig && props.dateConfig[dateKey];

  // 如果使用了日期配置模式
  if (hasDateConfig) {
    // 只有在 dateConfig 中有该日期配置时才显示任务
    if (dateTask) {
      tasks.push({
        id: daysDiff,
        title: dateTask.title || '学习任务',
        duration: dateTask.duration || '',
        description: dateTask.description || '',
        materials: dateTask.materials || '',
        exercises: dateTask.exercises || [],
        phase: dateTask.phase || phaseInfo.phaseName,
        color: phaseInfo.color,
        isCustomDate: true  // 标记为日期配置
      });
    }
    // 如果没有该日期配置，返回空任务（休息日）
    return tasks;
  }

  // 使用周配置（fallback，仅当 dateConfig 为空时）
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const phaseKey = `phase${phaseInfo.phaseIndex}`;
  const phasePlan = props.studyPlan[phaseKey];

  if (!phasePlan) return tasks;

  const dayTasks = isWeekend ? (phasePlan.weekend || []) : (phasePlan.weekday || []);

  // 根据星期几选择任务（循环使用任务列表）
  if (dayTasks.length > 0) {
    const taskIndex = isWeekend ? 0 : (dayOfWeek - 1) % dayTasks.length;
    const task = dayTasks[taskIndex];

    if (task) {
      tasks.push({
        id: daysDiff,
        title: task.title || '学习任务',
        duration: task.duration || '',
        description: task.description || '',
        materials: task.materials || '',
        exercises: task.exercises || [],
        phase: phaseInfo.phaseName,
        color: phaseInfo.color,
        isCustomDate: false
      });
    }
  }

  return tasks;
}

// 生成日历天数
const calendarDays = computed(() => {
  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const startDay = firstDay.getDay();

  // 上月填充
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDay - i);
    days.push({
      date: prevMonthLastDay - i,
      currentMonth: false,
      isToday: false,
      tasks: generateTasks(date),
      fullDate: formatDate(date),
      dateObj: date
    });
  }

  // 当月
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isToday = date.toDateString() === today.toDateString();
    days.push({
      date: i,
      currentMonth: true,
      isToday,
      tasks: generateTasks(date),
      fullDate: formatDate(date),
      dateObj: date
    });
  }

  // 下月填充
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i);
    days.push({
      date: i,
      currentMonth: false,
      isToday: false,
      tasks: generateTasks(date),
      fullDate: formatDate(date),
      dateObj: date
    });
  }

  return days;
});

// 格式化日期
function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 导航
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

// 选择日期（打开弹窗）
function selectDay(day) {
  openModal(day);
}

// 统计数据
const studyDaysCount = computed(() => {
  let count = 0;
  for (let i = 0; i < totalDays.value; i++) {
    const date = new Date(planStartDate.value);
    date.setDate(planStartDate.value.getDate() + i);
    if (generateTasks(date).length > 0) count++;
  }
  return count;
});

const restDaysCount = computed(() => totalDays.value - studyDaysCount.value);

const progressPercent = computed(() => {
  const daysPassed = Math.floor((today - planStartDate.value) / (1000 * 60 * 60 * 24));
  if (daysPassed < 0) return 0;
  if (daysPassed >= totalDays.value) return 100;
  return Math.round((daysPassed / totalDays.value) * 100);
});

// 初始化
onMounted(() => {
  // 选中今天
  const todayDay = calendarDays.value.find(d => d.isToday);
  if (todayDay) {
    selectedDay.value = todayDay;
  }
});
</script>

<style scoped>
.study-calendar {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav-btn {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #e5e7eb;
}

.month-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  background: transparent;
}

:root .month-title,
html:not(.dark) .month-title {
  color: #1f2937 !important;
}

.phase-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.phase-tag {
  padding: 6px 16px;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  padding: 10px;
  font-weight: 600;
  color: #6b7280;
  font-size: 14px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  min-height: 90px;
  padding: 8px;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.calendar-day:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.calendar-day.other-month {
  opacity: 0.4;
}

.calendar-day.today {
  background: #eff6ff;
  box-shadow: inset 0 0 0 2px #3b82f6;
}

.calendar-day.has-task {
  background: #ffffff;
}

.calendar-day.past-day {
  background: #e5e7eb;
}

.day-number {
  font-weight: 600;
  font-size: 14px;
  color: #374151;
}

.day-tasks {
  margin-top: 4px;
}

.task-item {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-tasks {
  font-size: 10px;
  color: #9ca3af;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-right: 40px;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #1f2937;
}

.day-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.day-status.completed {
  background: #d1fae5;
  color: #059669;
}

.day-status.today {
  background: #dbeafe;
  color: #2563eb;
}

.day-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.day-status.future {
  background: #f3f4f6;
  color: #6b7280;
}

.custom-date-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  background: #fef3c7;
  color: #92400e;
  margin-left: auto;
}

.no-tasks {
  color: #9ca3af;
  text-align: center;
  padding: 40px 20px;
}

.no-tasks-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-tasks p {
  margin: 0 0 8px 0;
}

.no-tasks-hint {
  font-size: 14px;
  color: #d1d5db;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-detail {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.task-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.task-phase {
  font-weight: 600;
  font-size: 12px;
}

.task-duration {
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
}

.task-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.task-desc {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;
}

.task-materials {
  font-size: 13px;
  color: #6b7280;
  background: #f9fafb;
  padding: 10px 12px;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
}

.materials-icon {
  flex-shrink: 0;
}

/* 练习详情样式 */
.exercises-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.exercises-header {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exercise-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f9fafb;
  border-radius: 8px;
  transition: all 0.2s;
}

.exercise-item.completed {
  background: #ecfdf5;
}

.exercise-item.completed .exercise-name {
  text-decoration: line-through;
  color: #9ca3af;
}

.exercise-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.exercise-checkbox input {
  display: none;
}

.checkmark-small {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.exercise-checkbox input:checked + .checkmark-small {
  background: #10b981;
  border-color: #10b981;
}

.exercise-checkbox input:checked + .checkmark-small::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.exercise-status {
  font-size: 16px;
  flex-shrink: 0;
}

.exercise-type {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  flex-shrink: 0;
}

.exercise-name {
  font-size: 13px;
  color: #374151;
  flex: 1;
}

.exercise-quantity {
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 2px;
}

.quantity-done {
  font-weight: 600;
  color: #10b981;
}

.quantity-sep {
  color: #d1d5db;
}

.quantity-total {
  color: #9ca3af;
}

.task-completion-status {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
}

.status-completed {
  color: #059669;
  font-weight: 500;
}

.status-pending {
  color: #6b7280;
}

/* 任务进度条 */
.task-progress-bar {
  margin-top: 16px;
}

.progress-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
}

.progress-track {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.task-completion {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.completion-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #4b5563;
}

.completion-checkbox input {
  display: none;
}

.completion-checkbox .checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.completion-checkbox input:checked + .checkmark {
  background: #10b981;
  border-color: #10b981;
}

.completion-checkbox input:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.completion-checkbox input:checked ~ span:last-child {
  color: #10b981;
  font-weight: 500;
}

.study-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

/* 暗色模式适配 */
:global(.dark) .study-calendar {
  background: #1e293b;
}

:global(.dark) .month-title {
  color: #f1f5f9 !important;
}

:global(.dark) .nav-btn {
  background: #334155;
  color: #f1f5f9;
}

:global(.dark) .nav-btn:hover {
  background: #475569;
}

:global(.dark) .weekday {
  color: #94a3b8;
}

:global(.dark) .calendar-day {
  background: #334155;
}

:global(.dark) .calendar-day:hover {
  background: #475569;
}

:global(.dark) .calendar-day.today {
  background: #1e3a5f;
}

:global(.dark) .calendar-day.has-task {
  background: #1e293b;
}

:global(.dark) .calendar-day.past-day {
  background: #475569;
}

:global(.dark) .day-number {
  color: #e2e8f0;
}

:global(.dark) .day-detail {
  background: #334155;
}

:global(.dark) .day-detail h3 {
  color: #f1f5f9;
}

:global(.dark) .task-detail {
  background: #1e293b;
}

:global(.dark) .task-title {
  color: #f1f5f9;
}

:global(.dark) .task-desc {
  color: #cbd5e1;
}

:global(.dark) .stat-item {
  background: #334155;
}

:global(.dark) .stat-label {
  color: #94a3b8;
}

/* 弹窗暗色模式 */
:global(.dark) .modal-content {
  background: #1e293b;
}

:global(.dark) .modal-close {
  background: #334155;
  color: #94a3b8;
}

:global(.dark) .modal-close:hover {
  background: #475569;
  color: #f1f5f9;
}

:global(.dark) .modal-header h3 {
  color: #f1f5f9;
}

:global(.dark) .no-tasks {
  color: #94a3b8;
}

:global(.dark) .no-tasks-hint {
  color: #64748b;
}

:global(.dark) .task-materials {
  background: #334155;
  color: #94a3b8;
}

:global(.dark) .task-completion {
  border-top-color: #334155;
}

:global(.dark) .completion-checkbox {
  color: #94a3b8;
}

:global(.dark) .completion-checkbox .checkmark {
  border-color: #475569;
}

/* 练习部分暗色模式 */
:global(.dark) .exercises-section {
  border-top-color: #334155;
}

:global(.dark) .exercises-header {
  color: #e2e8f0;
}

:global(.dark) .exercise-item {
  background: #334155;
}

:global(.dark) .exercise-item.completed {
  background: #1e3a3a;
}

:global(.dark) .exercise-name {
  color: #e2e8f0;
}

:global(.dark) .exercise-item.completed .exercise-name {
  color: #64748b;
}

:global(.dark) .checkmark-small {
  border-color: #475569;
}

:global(.dark) .progress-input {
  background: #1e293b;
  border-color: #475569;
  color: #e2e8f0;
}

:global(.dark) .progress-track {
  background: #334155;
}

:global(.dark) .progress-label {
  color: #94a3b8;
}

/* 响应式 */
@media (max-width: 768px) {
  .calendar-day {
    min-height: 60px;
    padding: 4px;
  }

  .task-item {
    display: none;
  }

  .calendar-day.has-task::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background: currentColor;
    border-radius: 50%;
    margin-top: 4px;
  }

  .study-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
