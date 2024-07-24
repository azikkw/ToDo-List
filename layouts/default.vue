<template>
  <div class="background">
    <div class="todo-back">
      <div class="navigation">
        <p class="font-bold text-3xl 2xl:text-[32px]">to<span class="text-[#805CF8]">do.</span></p>
        <ul class="folders">
          <li><NuxtLink to="/"><Icon name="fluent:mail-inbox-20-regular" size="25"/> Tasks</NuxtLink></li>
          <li><NuxtLink to="/complete"><Icon name="material-symbols-light:done-all-rounded" size="25"/> Complete</NuxtLink></li>
        </ul>
        <a class="to-github" href="https://github.com/azikkw/ToDo-List" target="_blank">
          <img class="size-[32px] lg:size-[28px]" src="/assets/icons/github.svg" alt="github"/>
          <p>azikkw</p>
        </a>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

  /* Background styles */
  .background {
    @apply w-full h-screen flex justify-center items-center bg-[#18181C] lg:bg-back-color;
  }
  /* To-Do window back styles */
  .todo-back {
    @apply relative w-full lg:w-[950px] h-screen lg:h-[80%] flex justify-start items-start flex-col lg:flex-row bg-[#18181C] text-[#E1E2FC] lg:rounded-[20px];
  }
  /* Navigation styles */
  .navigation {
    @apply w-full lg:w-[30%] lg:h-full relative bg-[#17171B] px-[15px] lg:px-[30px] pt-[20px] pb-[5px] lg:py-[35px] lg:rounded-l-[20px];
  }
  .folders {
    @apply mt-[12px] flex lg:block lg:mt-10;
  }
  .folders li {
    @apply w-full;
  }
  .folders li a {
    @apply w-full h-[40px] flex justify-center items-center px-2 gap-2 mb-2 rounded-lg font-medium opacity-85 cursor-pointer lg:justify-start;
  }
  .folders li a span {
    @apply size-[28px];
  }
  .folders li a.router-link-exact-active {
    @apply bg-[#2F2D36];
  }
  .to-github {
    @apply absolute right-[15px] lg:right-auto lg:left-[30px] top-[25px] lg:top-auto lg:bottom-[35px] flex items-center gap-2 text-[16px] font-medium opacity-65 hover:opacity-90 transition-opacity duration-200;
  }
  .to-github p {
    @apply hidden lg:block;
  }

  /* Styles for big screens */
  @media (min-width: 1600px) {
    .todo-back {
      @apply w-[65%];
    }
    .folders li a {
      @apply 2xl:h-[45px] 2xl:text-lg;
    }
    .folders li a span {
      @apply size-[28px];
    }
    .to-github img {
      @apply size-[35px];
    }
    .to-github p {
      @apply text-lg;
    }
  }

</style>