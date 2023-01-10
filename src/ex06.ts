function Warning(message?: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Warning: ${message}`);
      const result = method.apply(this, args);
      return result;
    }
    return descriptor;
  };
}

class WarningTest {
  constructor(private value: number) {
  }

  @Warning('Warning Test')
  div(num: number) {
    return this.value / num;
  }
}

const warning = new WarningTest(10);
console.log(warning.div(5));
