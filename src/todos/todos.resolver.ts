import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Resolver(() => Todo)
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

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('UpdateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'removeTodo' })
  removeTodo(@Args('id', { nullable: false, type: () => Int }) id: number) {
    return this.todoService.delete(id);
  }
}
