import axios from 'axios'

const state = {
  todos: [

  ]
}

//Гетеры передают данные в компонент
const getters = {
  allTodos: (state) => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('http://localhost:800/api/todos')

    commit('setTodos', response.data)
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      'http://localhost:800/api/todos',
      { title, completed: false }
    );

    commit('newTodo', response.data);
  },

  async deleteTodo({ commit }, _id) {
    await axios.delete(`http://localhost:800/api/todos/${_id}`);

    commit('removeTodo', _id);
  },

  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(`http://localhost:800/api/todos/limit/${limit}`);

    commit('setTodos', response.data);
  },

  async updateTodo({ commit }, updTodo) {
    
    const response = await axios.put(
      `http://localhost:800/api/todos/${updTodo._id}`
    );
    

    commit('setTodos', response.data);
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, _id) => (state.todos = state.todos.filter(todo => todo._id !== _id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}