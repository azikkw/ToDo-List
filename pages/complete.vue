<template>
  <div class="todos-list">
    <p class="title lg:!mb-[20px]">Complete Tasks</p>
    <ul class="t-list">
      <li v-show="completeTasks.length === 0" class="!bg-transparent opacity-85">- Your completed tasks will be here!</li>
      <li v-for="(task, index) in completeTasks" :key="index">
        <div @click="recoverTask(index)" class="flex cursor-pointer">
          <div class="flex items-center">
            <input type="checkbox" checked class="todo-checkbox hidden">
            <span class="mr-3"></span>
          </div>
          <p class="flex-1">{{task}}</p>
        </div>
        <div class="todo-options">
          <img @click="removeCompleteTask(index)" src="/assets/icons/delete.svg" alt="delete"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

  const tasks = ref([]);
  const completeTasks = ref([]);

  onMounted(() => {
    tasks.value = getTasks();
    completeTasks.value = getCompleteTasks();
  });

  // Recover task from complete tasks list
  const recoverTask = (id) => {
    const task = completeTasks.value[id];

    tasks.value.push(task);
    localStorage.setItem("todoList", JSON.stringify(tasks.value));

    // Remove task from complete tasks list
    removeCompleteTask(id);
  }

  // Remove task from complete tasks list
  const removeCompleteTask = (index) => {
    completeTasks.value.splice(index, 1);
    localStorage.setItem("completeList", JSON.stringify(completeTasks.value));
  }

</script>

<style scoped>

  .t-list {
    @apply lg:h-[calc(100%-55px)] lg:overflow-y-auto;
  }

</style>