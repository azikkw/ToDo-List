<template>
  <div v-if="themeMode" class="background w-ful h-screen flex justify-center items-center font-satoshi">
    <div :class="['todo-back w-[950px] h-[80%] flex', themeMode]">
      <!-- Navigation -->
      <div class="navigation w-[30%] h-full bg-[#f7f7f7] rounded-l-[20px] py-[35px] px-[30px] relative">
        <p class="font-bold text-3xl">to<span class="text-[#805CF8]">do.</span></p>
        <ul class="folders mt-10">
          <li class="active"><Icon name="fluent:mail-inbox-20-regular" size="25"/> Tasks</li>
<!--          <li><Icon name="material-symbols-light:today" size="25"/> Today</li>-->
          <li><Icon name="material-symbols-light:done-all-rounded" size="25"/> Complete</li>
        </ul>
        <div class="change-theme">
          <div class="light-theme" @click="changeThemeMode('light-mode')"><Icon name="ph:sun-dim-light" size="29px" /></div>
          <div class="dark-theme" @click="changeThemeMode('dark-mode')"><Icon name="material-symbols-light:dark-mode-outline" size="28px" /></div>
          <span class="active-theme"></span>
        </div>
      </div>
      <!-- To Do List -->
      <div class="todos-list w-[70%] h-full bg-white rounded-r-[20px] px-[38px] pt-[38px] pb-[35px]">
        <p class="font-bold text-[#898BCC] text-2xl">Tasks</p>
        <ul class="t-list">
          <li>
            <label class="flex cursor-pointer">
              <div class="flex items-center">
                <input type="checkbox" class="todo-checkbox hidden">
                <span class="mr-3"></span>
              </div>
              <p>Buy some bread</p>
            </label>
            <div class="todo-options flex items-center gap-2">
              <Icon name="mdi:pencil" size="23px"/>
              <Icon name="ic:round-delete-forever" size="23px"/>
            </div>
          </li>
        </ul>
        <div class="add-task">
          <input type="text" placeholder="Enter task...." />
          <button aria-label="Add task btn">Add Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  const themeMode = ref(null);

  onMounted( () => {
    if(localStorage.getItem('themeMode') !== null) {
      themeMode.value = localStorage.getItem('themeMode');
    } else localStorage.setItem('themeMode', 'dark-mode');
  });

  // Theme changer
  const changeThemeMode = (mode) => {
    if(mode === "dark-mode") themeMode.value = mode;
    else themeMode.value = mode;

    localStorage.setItem('themeMode', mode);
  }

</script>

<style scoped>

  /* Custom font-family */
  @font-face {
    font-family: Satoshi;
    src: url("/assets/fonts/Satoshi-Variable.ttf");
  }

  .background {
    background: linear-gradient(
        to bottom right, #B2ACE2, #474A76
    );
  }

  .todo-back.dark-mode {
    @apply text-[#E1E2FC];
  }
  .todo-back.dark-mode .navigation {
    @apply bg-[#17171B];
  }
  .todo-back.dark-mode .todos-list {
    @apply bg-[#18181C];
  }

  .folders li {
    @apply w-full h-[40px] flex items-center px-2 gap-2 mb-2 rounded-lg font-medium opacity-85 cursor-pointer;
  }
  .folders li.active {
    @apply bg-[#e6e6e6];
  }
  .todo-back.dark-mode .folders li.active {
    @apply bg-[#2F2D36];
  }

  /* Theme changer */
  .change-theme {
    @apply w-fit h-[40px] bg-[#e6e6e6] rounded-3xl flex justify-between items-center absolute bottom-0 mb-[35px];
  }
  .todo-back.dark-mode .change-theme {
    @apply bg-[#2F2D36];
  }
  .active-theme {
    @apply w-[40px] h-[40px] absolute left-0 top-1/2 -translate-y-1/2 z-0 bg-[#805CF8] rounded-3xl transition-all duration-700;
  }
  .todo-back.dark-mode .active-theme {
    @apply transform translate-x-[40px] -translate-y-1/2;
  }
  .light-theme,
  .dark-theme {
    @apply w-[40px] h-[40px] flex justify-center items-center cursor-pointer z-[1];
  }
  .light-theme {
    @apply text-white transition-all duration-[1000ms] hover:rotate-180;
  }
  .dark-theme {
    @apply transition-all duration-500 hover:rotate-[-30deg];
  }

  .todos-list {
    @apply h-full relative flex flex-col justify-between;
  }
  .t-list {
    @apply h-[calc(100%-110px)] overflow-y-auto;
  }
  .t-list::-webkit-scrollbar {
    @apply w-[5px];
  }
  .t-list::-webkit-scrollbar-track {
    @apply bg-transparent;
  }
  .t-list::-webkit-scrollbar-thumb {
    @apply bg-[#898BCC] rounded-[3px];
  }

  .t-list li {
    @apply w-full h-fit bg-[#EDEDED] font-medium flex justify-between items-center px-4 py-[12px] rounded-lg gap-[20px] mb-[10px];
  }
  .todo-back.dark-mode .t-list li {
    @apply bg-[#2F2D36] font-normal;
  }

  .todo-checkbox + span {
    @apply !w-[16px] !h-[16px] bg-transparent rounded-[50%] border border-black;
  }
  .todo-back.dark-mode .todo-checkbox + span {
    @apply border-white;
  }
  .todo-checkbox:checked + span {
    @apply bg-[#805CF8] border-none;
  }

  .todo-options span {
    @apply opacity-65 transition-opacity duration-200 hover:opacity-100 cursor-pointer;
  }

  .add-task {
    @apply w-full flex items-center gap-[10px];
  }
  .add-task input {
    @apply flex-1 h-[45px] rounded-[12px] border border-[#CFCFCF] bg-transparent px-[30px] text-[15.5px] focus:outline-none focus:border-[#898BCC];
  }
  .todo-back.dark-mode .add-task input {
    @apply border-[#464351] focus:border-[#898BCC];
  }
  .add-task button {
    background: linear-gradient(
        to bottom right, #8E6FF8, #7046F8
    );
    @apply text-white w-[140px] h-[45px] rounded-[12px] text-[17px] font-medium hover:opacity-90 transition-all duration-200;
  }

</style>