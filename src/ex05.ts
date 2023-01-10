function Enumerable(value: boolean): MethodDecorator {
  return <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    descriptor.enumerable = value;
  };
}

class Greeter {
  constructor(private greeting: string) {
  }

  @Enumerable(false)
  // @Enumerable(true)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

const greeter = new Greeter('Kim');
for (let key in greeter) {
  console.log(key);
}