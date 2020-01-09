<template>
  <div>
    <h3>Todos</h3>
    <transition name="fade">
      <div class="legend" v-show="show">
        <span>Double click to mark as complete</span>
        <span>
          <span class="incomplete-box"></span> = Incomplete
        </span>
        <span>
          <span class="complete-box"></span> = Complete
        </span>
      </div>
    </transition>

    <div class="todos" v-show="allTodos">
      <div
        @click="onDblClick(todo)"
        :key="todo.id"
        v-for="todo in allTodos"
        class="todo"
        v-bind:class="{'is-complete':todo.completed}"
      >
        {{ todo.title }}
        <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  data(){
    return{
      show: null
    }
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };

      this.updateTodo(updTodo);
    },
    showStatus(){
      this.show = true
    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
  mounted(){
    this.showStatus()
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>