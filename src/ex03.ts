const Deco: any = (tag: string) => {
  console.log(`Evaluate [${tag}]`)
  return (...args: any[]) => {
    console.log(`Call [${tag}]`);
    args.forEach((arg, i) => console.log(`${i + 1})`, arg));
  };
}

@Deco('Class Decorator')
class Test {
  @Deco('Static Property1')
  static staticProperty1?: number;

  @Deco('Instance Property1')
  instanceProperty1?: string;

  @Deco('Static Accessor')
  static get staticAccessor(): string {
    return 'name: ' + this.name;
  }

  @Deco('Instance Accessor')
  set instanceAccessor(@Deco('Instance Accessor Parameter') value: string) {
  }

  @Deco('Static Method')
  static staticMethod(@Deco('Static Method Parameter') param: string): void {
    console.log('Call method, params:', param);
  }

  @Deco('Instance Method')
  instanceMethod(@Deco('Instance Method Parameter') params: string): void {
  }

  @Deco('Instance Property2')
  instanceProperty2?: number;

  @Deco('Static Property2')
  staticProperty2?: string;
}
