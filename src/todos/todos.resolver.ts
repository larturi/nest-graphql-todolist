import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';

@Resolver()
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}
  @Query(() => [Todo], { name: 'findAll' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'findOne' })
  findOne(@Args('id', { nullable: false, type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('CreateTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  updateTodo() {
    return [];
  }

  removeTodo() {
    return [];
  }
}
