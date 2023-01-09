const Decorator: MethodDecorator = (...args: any[]): void => {
  console.log(args);
}


class Greeting {
  @Decorator
  sayHello(name: string): void {
    console.log(`Hello ${name}`);
  }
}

