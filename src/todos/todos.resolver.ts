import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}
  @Query(() => [Todo], { name: 'find' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
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

  // Agregations
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.getTotalTodos();
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todoService.getCompletedTodos();
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos(): number {
    return this.todoService.getPendingTodos();
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.getCompletedTodos(),
      pending: this.todoService.getPendingTodos(),
      total: this.todoService.getTotalTodos(),
      totalTodosCompleted: this.todoService.getTotalTodos(),
    };
  }
}
