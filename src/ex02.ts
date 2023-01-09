const Decorator2: any = (tag: string) => {
  return (...args: any[]) => {
    console.log(`--- [${tag}] ---`);
    args.forEach((arg, i) => console.log(`${i + 1})`, arg));
  };
}

@Decorator2('Class')
class Test {
  @Decorator2('Property')
  name?: string;

  @Decorator2('Accessor')
  get property(): string {
    return 'name: ' + this.name;
  }

  @Decorator2('Method')
  method(@Decorator2('Parameter') param: string): void {
    console.log('Call method, params:', param);
  }
}

const test = new Test();
