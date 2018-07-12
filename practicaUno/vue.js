/**
 * TODO: Crear la instancia principal de vue pasando la variable data.
 * TODO: Crear el componente nueva-tarea que contendra el div con el input y el botón para agregar una nueva tarea.
 * TODO: Dentro de nueva-tarea crear un método para agregar una tarea al arreglo.
 * TODO: Por último, crear el componente lista-tareas con un método para marcar una tarea como terminada y otro para borrar una tarea.
 */
var data = {
  tareas: [{
      texto: 'Aprender Vue.js',
      terminada: false
    },
    {
      texto: 'Aprender Angular 2',
      terminada: false
    },
    {
      texto: 'Aprender Ionic 2',
      terminada: false
    },
  ],
  nuevaTarea: ''
}

Vue.component('titulo', {
  template: `<h2>{{ titulo }}</h2>`,
  data: function () {
    return {
      titulo: "Lista de Tareas"
    }
  }
});

Vue.component('nueva-tarea', {
  template: 
  `<div class="input-group">
    <input 
      type="text" 
      placeholder="Escribe una nueva tarea" 
      class="form-control" 
      @input="$emit('input', $event.target.value)"
      >
    <span class="input-group-btn">
      <button 
        type="button" 
        class="btn btn-primary" 
        @click="addTask"
        >Agregar</button>
    </span>
  </div>`,
  props: ['tasks', 'newtask'],
  model: {
    prop: 'newtask',
    event: 'input'
  },
  data: function () {
    return {

    }
  },
  methods: {
    addTask() {
      if (this.newtask) {
        this.tasks.push({
          texto: this.newtask,
          'terminada': false
        })
      }
    }
  }
});

Vue.component('lista-tareas', {
  template: 
    `<ul class="list-group">
      <li class="list-group-item" v-for="(task, i) in tasks" :key="i">
        {{ task.texto }}
        <span class="pull-right">
          <button 
            type="button" 
            :class="['btn', 'btn-success', 
            'btn-xs', 'glyphicon', task.terminada ? 'glyphicon-ok' : 'glyphicon-remove']" 
            @click="finishTask(i)"
          ></button>
          <button 
            type="button" 
            class="btn btn-danger btn-xs glyphicon glyphicon-trash" 
            @click="deleteTask(i)"
          ></button>
        </span>
      </li>
    </ul>`,
  props: ['tasks'],
  methods: {
    finishTask (index) {
      this.tasks[index].terminada = !this.tasks[index].terminada
      this.$emit('finish-task', this.tasks)
    },
    deleteTask (index) {
      this.tasks.splice(index, 1)
      this.$emit('delete-task', this.tasks)
    }
  }
});

let app = new Vue({
  el: "#app",
  data: {
    ...data
  }
});