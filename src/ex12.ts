import 'reflect-metadata';

const NOT_NULL = Symbol('NOT_NULL');

function NotNull2(target: any, propertyKey: string | symbol, parameterIndex: number) {
  let exParameters: number[] = Reflect.getOwnMetadata(NOT_NULL, target, propertyKey) || [];
  exParameters.push(parameterIndex);
  Reflect.defineMetadata(NOT_NULL, exParameters, target, propertyKey);
}

function Validate2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let method = descriptor.value!;

  descriptor.value = function (...args: any[]) {
    let parameterIndexes: number[] = Reflect.getOwnMetadata(NOT_NULL, target, propertyKey);
    console.log('parameterIndexes:::', parameterIndexes);
    if (parameterIndexes) {
      for (let index of parameterIndexes) {
        console.log(`args[${index}]:::`, args[index]);
        if (args[index] === null) throw new Error(`${this.constructor.name}::${propertyKey} method param at index ${index} cannot be null`);
      }
    }
    return method.apply(this, args);
  }
}

class Task2 {
  @Validate2
  run(@NotNull2 name: any): void {
    console.log('running task, name:', name);
  }
}

try {
  let task: Task2 = new Task2();
  
  task.run('Hello');
  task.run(null);
} catch(e: any) {
  console.error(e.message);
}
