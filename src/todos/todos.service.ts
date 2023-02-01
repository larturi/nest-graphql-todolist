import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: true },
    { id: 3, description: 'Piedra del poder', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }
}
