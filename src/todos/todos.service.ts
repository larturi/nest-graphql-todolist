import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: true },
    { id: 3, description: 'Piedra del poder', done: true },
    { id: 4, description: 'Piedra del tiempo', done: true },
  ];

  getTotalTodos() {
    return this.todos.length;
  }

  getCompletedTodos() {
    return this.findAll({ status: true }).length;
  }

  getPendingTodos() {
    return this.findAll({ status: false }).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((t) => t.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const { description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  delete(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((t) => t.id !== id);
    return true;
  }
}
