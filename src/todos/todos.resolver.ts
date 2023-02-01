import { Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}
  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  findOne() {
    return [];
  }

  createTodo() {
    return [];
  }

  updateTodo() {
    return [];
  }

  removeTodo() {
    return [];
  }
}
