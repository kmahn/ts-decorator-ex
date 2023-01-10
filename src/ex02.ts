function First(): MethodDecorator {
  console.log('first(): factory evaluated');
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    console.log('first(): called');
  };
}

function Second(): MethodDecorator {
  console.log('second(): factory evaluated');
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    console.log('second(): called');
  };
}

class Test2 {
  @First()
  @Second()
  method(): void {
  }
}
