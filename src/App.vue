<template>
  <div id="app">
    <div class="container">
      <transition name="fade">
        <AddTodo v-show="show" />
      </transition>
        <FilterTodos v-show="show" />
        <Todos v-show="show" />
    </div>
  </div>
</template>

<script>
import FilterTodos from "./components/FilterTodos";
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo";

export default {
  name: "app",
  data(){
    return{
      show: null
    }
  },
  components: {
    Todos,
    AddTodo,
    FilterTodos
  },
  methods:{
    setStatus(){
      this.show = true
    }
  },
  mounted(){
    this.setStatus()
  }
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
