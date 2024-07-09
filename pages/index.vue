<template>
  <div class="background w-ful flex justify-center items-center font-satoshi">
    <div class="todo-back bg-[#18181C] text-[#E1E2FC] relative">
      <!-- Navigation -->
      <div class="navigation bg-[#17171B]">
        <p class="font-bold text-3xl 2xl:text-[32px]">to<span class="text-[#805CF8]">do.</span></p>
        <ul class="folders">
          <li @click="navTo('tasks')" :class="{'active': isActive === 'tasks'}"><Icon name="fluent:mail-inbox-20-regular" size="25"/> Tasks</li>
          <li @click="navTo('complete')" :class="{'active': isActive === 'complete'}"><Icon name="material-symbols-light:done-all-rounded" size="25"/> Complete</li>
        </ul>
      </div>
      <!-- To Do List -->
      <div v-if="isActive === 'tasks'" class="todos-list">
        <p class="title flex items-end justify-between font-bold text-[#898BCC] text-2xl">
          Tasks
          <button @click="toggleAddTask(true)" class="w-[48px] h-[30px] pt-[2px] rounded-[6px] text-white bg-[#805CF8] lg:hidden" aria-label="Open add task btn">
            <Icon name="material-symbols:add-rounded" size="28px"/>
          </button>
        </p>
        <ul class="t-list">
          <li v-show="tasks.length === 0" class="!bg-transparent opacity-85">- Write down your goals here so that you don't forget them later!</li>
          <li v-for="(task, index) in tasks" :key="index">
            <div @click="completeTask(index)" class="flex cursor-pointer">
              <div class="flex items-center">
                <input type="checkbox" class="todo-checkbox hidden">
                <span class="mr-3"></span>
              </div>
              <p class="flex-1">{{task}}</p>
            </div>
            <textarea v-show="index === editIndex" v-model="editText" @keydown="editTaskKeydown" />
            <div class="todo-options flex items-center gap-2">
              <img v-show="index !== editIndex" @click="openEditTask(task, index)" src="/assets/icons/edit.svg" alt="edit"/>
              <img v-show="index === editIndex" @click="saveEditTask" src="/assets/icons/save.svg" alt="save"/>
              <img @click="removeTask(index)" src="/assets/icons/delete.svg" alt="delete"/>
            </div>
          </li>
        </ul>
        <div class="add-task !hidden lg:!flex lg:!flex-row">
          <input type="text" v-model="todoText" @keydown="addTaskKeydown" placeholder="Enter task...." />
          <button @click="addTask" aria-label="Add task btn">Add Task</button>
        </div>
      </div>
      <!-- Complete to-do's list -->
      <div v-else class="todos-list !block">
        <p class="title font-bold text-[#898BCC] text-2xl lg:!mb-[20px]">Complete Tasks</p>
        <ul class="t-list complete">
          <li v-show="completeTasks.length === 0" class="!bg-transparent opacity-85">- Your completed tasks will be here!</li>
          <li v-for="(task, index) in completeTasks" :key="index">
            <div @click="recoverTask(index)" class="flex cursor-pointer">
              <div class="flex items-center">
                <input type="checkbox" checked class="todo-checkbox hidden">
                <span class="mr-3"></span>
              </div>
              <p class="flex-1">{{task}}</p>
            </div>
            <div class="todo-options flex items-center gap-2">
              <Icon @click="removeCompleteTask(index)" name="ic:round-delete-forever" size="23px"/>
            </div>
          </li>
        </ul>
      </div>
      <!-- GitHub link -->
      <a class="w-full absolute left-0 bottom-0 py-[15px] text-[17px] flex justify-center items-center gap-2 bg-[#141418] opacity-65 hover:opacity-90 transition-opacity duration-200 font-medium lg:w-fit lg:bg-transparent lg:left-[30px] lg:bottom-[35px] lg:justify-start lg:py-0 lg:text-[16px]" href="https://github.com/azikkw/ToDo-List" target="_blank">
        <img class="size-[32px] lg:size-[28px]" src="/assets/icons/github.svg" alt="github"/>
        azikkw
      </a>
      <!-- Add task when max-w=728px -->
      <div @click="toggleAddTask(false)" class="w-full h-full absolute top-0 left-0" :class="{'!hidden': !toggleAddTaskCond, '!flex': toggleAddTaskCond}"></div>
      <div class="add-task lg:!hidden" :class="{'!hidden': !toggleAddTaskCond, '!flex': toggleAddTaskCond}">
        <input class="z-[2]" ref="taskInput" type="text" v-model="todoText" @keydown="addTaskKeydown" placeholder="Enter task...." />
        <button class="z-[2]" @click="addTask" aria-label="Add task btn">Add Task</button>
      </div>
    </div>
  </div>
</template>

<script setup>

  const tasks = ref([]);
  const completeTasks = ref([]);

  const todoText = ref('');

  const editIndex = ref(null);
  const editText = ref('');

  const isActive = ref('tasks');
  const toggleAddTaskCond = ref(false);
  const taskInput = ref(null);

  onMounted(() => {
    getTasks();
  });

  // Navigation between tasks and complete task
  const navTo = (to) => {
    if(to === 'tasks') isActive.value = to;
    else isActive.value = to;
  }

  // Add Task
  const addTask = () => {
    // Checking task length more than 0
    if(todoText.value.length > 0) {
      tasks.value.push(todoText.value);
      localStorage.setItem("todoList", JSON.stringify(tasks.value));
      todoText.value = '';

      // Close addTask window for tablets and phones when task added
      toggleAddTaskCond.value = false
    }
  }
  // Add Task func. if user pressed Enter
  const addTaskKeydown = (event) => {
    // checking for Enter key
    if(event.key === 'Enter') {
      addTask();
    }
  }
  // Opening AddTask window when user click to add btn
  const toggleAddTask = async (condition) => {
    if(condition) {
      toggleAddTaskCond.value = true;
      // Focusing on input
      await nextTick();
      taskInput?.value.focus();
    }
    else toggleAddTaskCond.value = false;
  }

  // Get Tasks from local storage
  const getTasks = () => {
    // Getting tasks
    if(localStorage.getItem("todoList") !== null)
      tasks.value = JSON.parse(localStorage.getItem("todoList"));
    // Getting complete tasks
    if(localStorage.getItem("completeList") !== null)
      completeTasks.value = JSON.parse(localStorage.getItem("completeList"));
  }

  // Remove task
  const removeItem = (array, index, storageKey) => {
    array.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(array));
  }
  // From tasks list
  const removeTask = (id) => {
    removeItem(tasks.value, id, "todoList");
  }
  // From complete tasks list
  const removeCompleteTask = (id) => {
    removeItem(completeTasks.value, id, "completeList");
  }

  // Complete task
  const completeTask = (id) => {
    const task = tasks.value[id];

    completeTasks.value.push(task);
    localStorage.setItem("completeList", JSON.stringify(completeTasks.value));

    // Remove task from tasks list
    removeTask(id);
  }

  // Recover task from complete tasks list
  const recoverTask = (id) => {
    const task = completeTasks.value[id];

    tasks.value.push(task);
    localStorage.setItem("todoList", JSON.stringify(tasks.value));

    // Remove task from complete tasks list
    removeCompleteTask(id);
  }


  // Edit task
  const openEditTask = (task, id) => {
    editIndex.value = id;
    editText.value = task;
  }
  // Saving edited task
  const saveEditTask = () => {
    tasks.value[editIndex.value] = editText.value;
    localStorage.setItem("todoList", JSON.stringify(tasks.value));
    editIndex.value = null;
  }
  // Saving edited task when Enter pressed
  const editTaskKeydown = (event) => {
    if(event.key === 'Enter') {
      saveEditTask();
    }
  }

</script>

<style scoped>

  /* Custom font-family */
  @font-face {
    font-family: Satoshi;
    src: url("/assets/fonts/Satoshi-Variable.ttf");
  }

  /* Background styles */
  .background {
    @apply min-h-screen bg-[#18181C] lg:h-screen lg:bg-back-color;
  }
  /* To-Do window back styles */
  .todo-back {
    @apply w-full min-h-screen flex justify-start items-start flex-col lg:w-[950px] lg:min-h-fit lg:h-[80%] lg:flex-row lg:rounded-[20px];
  }
  /* Navigation styles */
  .navigation {
    @apply w-full relative pt-[20px] px-[15px] pb-[5px] lg:w-[30%] lg:h-full lg:rounded-l-[20px] lg:py-[35px] lg:px-[30px];
  }
  .folders {
    @apply mt-[12px] flex lg:block lg:mt-10;
  }
  .folders li {
    @apply w-full h-[40px] flex justify-center items-center px-2 gap-2 mb-2 rounded-lg font-medium opacity-85 cursor-pointer lg:justify-start;
  }
  .folders li span {
    @apply size-[28px];
  }
  .folders li.active {
    @apply bg-[#2F2D36];
  }
  /* To-Do lists styles */
  .todos-list {
    @apply w-full h-full mb-[60px] px-[15px] pt-[10px] pb-[20px] lg:w-[70%] lg:flex lg:flex-col lg:justify-between lg:px-[38px] lg:pt-[38px] lg:pb-[35px] lg:mb-0;
  }
  .todos-list .title {
    @apply mb-[18px] lg:mb-0;
  }
  .t-list {
    /* Tasks list styles */
    @apply lg:h-[calc(100%-110px)] lg:overflow-y-auto;;
  }
  .t-list.complete {
    /* Complete task list styles */
    @apply lg:h-[calc(100%-55px)];
  }
  .t-list::-webkit-scrollbar {
    @apply w-0 lg:w-[5px];
  }
  .t-list::-webkit-scrollbar-track {
    @apply bg-transparent;
  }
  .t-list::-webkit-scrollbar-thumb {
    @apply bg-[#898BCC] rounded-[3px];
  }
  .t-list li {
    @apply relative w-full h-fit bg-[#2F2D36] font-normal flex justify-between items-center px-4 py-[15px] rounded-lg gap-[20px] mb-[10px] lg:py-[12px];
  }
  .t-list li:last-child {
    @apply mb-0;
  }
  /* Editing textarea styles */
  .t-list li textarea {
    @apply w-[calc(100%-134px)] h-[calc(100%-15px)] absolute left-0 bg-[#2F2D36] ml-[38px] px-[6px] pt-[7px] border border-[#69647A] rounded-[5px] resize-none focus:outline-none lg:pt-[3.5px];
  }
  /* Checkbox styles */
  .todo-checkbox + span {
    @apply !w-[16px] !h-[16px] bg-transparent rounded-[50%] border border-white;
  }
  .todo-checkbox:checked + span {
    @apply bg-[#805CF8] border-none;
  }
  /* To-Do options styles */
  .todo-options img {
    @apply size-[25px] lg:size-[23px] opacity-65 transition-opacity duration-200 hover:opacity-100 cursor-pointer;
  }
  /* Add task styles */
  .add-task {
    @apply z-[1] absolute left-0 bottom-0 w-full h-[68%] flex items-center flex-col gap-[10px] bg-[#141418] rounded-t-[12px] py-7 px-[15px] lg:relative lg:p-0 lg:h-fit lg:bg-transparent;
  }
  .add-task input {
    @apply w-full h-[50px] rounded-[12px] border border-[#464351] bg-transparent px-[30px] text-[15.5px] focus:outline-none focus:border-[#898BCC] lg:h-[45px];
  }
  .add-task button {
    background: linear-gradient(
        to bottom right, #8E6FF8, #7046F8
    );
    @apply text-white w-full h-[50px] rounded-[12px] text-[18px] font-medium hover:opacity-90 transition-all duration-200 lg:w-[185px] lg:h-[45px] lg:text-[17px];
  }

</style>