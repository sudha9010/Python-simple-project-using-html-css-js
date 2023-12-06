from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET', 'POST', 'DELETE'])
def manage_todos():
    if request.method == 'GET':
        return jsonify(todos)
    elif request.method == 'POST':
        data = request.get_json()
        todo = {'id': len(todos) + 1, 'task': data['task']}
        todos.append(todo)
        return jsonify(todo)
    elif request.method == 'DELETE':
        data = request.get_json()
        todo_id = data['id']
        todos[:] = [todo for todo in todos if todo['id'] != todo_id]
        return jsonify({'message': 'Todo deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
