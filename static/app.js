new Vue({
    el: '#app',
    data: {
        newTask: '',
        todos: []
    },
    mounted() {
        this.fetchTodos();
    },
    methods: {
        async fetchTodos() {
            const response = await fetch('/api/todos');
            const data = await response.json();
            this.todos = data;
        },
        async addTodo() {
            if (this.newTask.trim() === '') return;
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: this.newTask }),
            });
            const data = await response.json();
            this.todos.push(data);
            this.newTask = '';
        },
        async deleteTodo(id) {
            const response = await fetch('/api/todos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            await response.json();
            this.todos = this.todos.filter(todo => todo.id !== id);
        }
    }
});
