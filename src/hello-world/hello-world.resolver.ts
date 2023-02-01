import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Retorna hola mundo', name: 'hello' })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    description: 'Retorna un numero random',
    name: 'randomNumber',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'Retorna un numero random entre cero y n (default = 10)',
    name: 'randomFromZeroTo',
  })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) n = 10,
  ): number {
    return Math.floor(Math.random() * (n + 1));
  }
}
