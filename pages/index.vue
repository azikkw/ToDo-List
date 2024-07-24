<template>
  <div class="todos-list">
    <p class="title flex items-end justify-between">
      Tasks
      <button @click="toggleAddTask(true)" class="add-task-phone" aria-label="Open add task btn">
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
        <textarea v-show="index === editIndex" v-model="editText" @keydown="editTaskKeydown" required />
        <div class="todo-options">
          <img v-show="index !== editIndex" @click="openEditTask(task, index)" src="/assets/icons/edit.svg" alt="edit"/>
          <img v-show="index === editIndex" @click="saveEditTask" src="/assets/icons/save.svg" alt="save"/>
          <img @click="removeTask(index)" src="/assets/icons/delete.svg" alt="delete"/>
        </div>
      </li>
    </ul>
    <div class="add-task !hidden lg:!flex lg:!flex-row">
      <input type="text" v-model="todoText" @keydown="addTaskKeydown" placeholder="Enter task...." required />
      <button @click="addTask" aria-label="Add task btn">Add Task</button>
    </div>
  </div>
  <!-- Add task when max-w=728px -->
  <div @click="toggleAddTask(false)" class="add-task-close" :class="{'!hidden': !toggleAddTaskCond, '!flex': toggleAddTaskCond}"></div>
  <div class="add-task lg:!hidden" :class="{'!hidden': !toggleAddTaskCond, '!flex': toggleAddTaskCond}">
    <input class="z-[2]" ref="taskInput" type="text" v-model="todoText" @keydown="addTaskKeydown" placeholder="Enter task...." />
    <button class="z-[2]" @click="addTask" aria-label="Add task btn">Add Task</button>
  </div>
</template>

<script setup>


  const tasks = ref([]);
  const completeTasks = ref([]);

  const todoText = ref('');

  const editIndex = ref(null);
  const editText = ref('');

  const toggleAddTaskCond = ref(false);
  const taskInput = ref(null);

  onMounted(() => {
    tasks.value = getTasks();
    completeTasks.value = getCompleteTasks();
  });

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

  // Remove task
  const removeTask = (index) => {
    tasks.value.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(tasks.value));
  }

  // Complete task
  const completeTask = (id) => {
    const task = tasks.value[id];

    completeTasks.value.push(task);
    localStorage.setItem("completeList", JSON.stringify(completeTasks.value));

    // Remove task from tasks list
    removeTask(id);
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

  .t-list {
    @apply lg:h-[calc(100%-110px)] lg:overflow-y-auto;
  }
  .t-list li textarea {
    @apply w-[calc(100%-134px)] h-[calc(100%-15px)] absolute left-0 bg-[#2F2D36] ml-[38px] px-[6px] pt-[7px] border border-[#69647A] rounded-[5px] resize-none focus:outline-none lg:pt-[3.5px];
  }
  .add-task-phone {
    @apply w-[48px] h-[30px] pt-[2px] rounded-[6px] text-white bg-[#805CF8] lg:hidden;
  }
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
  .add-task-close {
    @apply w-full h-full absolute top-0 left-0;
  }

  /* Styles for big screens */
  @media (min-width: 1600px) {
    .t-list li textarea {
      @apply pt-[7px];
    }
    .add-task input {
      @apply h-[50px] text-[17px];
    }
    .add-task button {
      @apply h-[50px] text-[18px] w-[195px];
    }
  }

</style>