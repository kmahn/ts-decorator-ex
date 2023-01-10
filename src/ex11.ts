function NotNull(target: any, propertyKey: string, parameterIndex: number) {
  Validator.registerNotNull(target, propertyKey, parameterIndex);
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let method = descriptor.value!;

  descriptor.value = function (...args: any[]) {
    if (!Validator.performValidation(target, propertyKey, args)) {
      return;
    }
    let result = method.apply(this, args);
    return result;
  }
}

class Validator {
  private static _notNullValidatorMap: Map<any, Map<string, number[]>> = new Map<any, Map<string, number[]>>();

  static registerNotNull(target: any, methodName: string, paramIndex: number): void {
    let paramMap: Map<string, number[]> | undefined = Validator._notNullValidatorMap.get(target);
    if (!paramMap) {
      paramMap = new Map();
      this._notNullValidatorMap.set(target, paramMap);
    }
    let paramIndexes: number[] | undefined = paramMap.get(methodName);
    if (!paramIndexes) {
      paramIndexes = [];
      paramMap.set(methodName, paramIndexes);
    }

    paramIndexes.push(paramIndex);
  }

  static performValidation(target: any, methodName: string, paramValues: any[]): boolean {
    let notNullMethodMap: Map<string, number[]> | undefined = Validator._notNullValidatorMap.get(target);
    if (!notNullMethodMap) return true;

    let paramIndexes: number[] | undefined = notNullMethodMap.get(methodName);
    if (!paramIndexes) return true;

    let hasError = false;
    for (const [index, paramValue] of paramValues.entries()) {
      if (paramIndexes.indexOf(index) !== -1) {
        if (paramValue === null) {
          console.error('Method param at index ' + index + ' cannot be null');
          hasError = true;
        }
      }
    }

    return !hasError;
  }
}

class Task {
  @Validate
  run(@NotNull name: any): void {
    console.log('running task, name:', name);
  }
}

let task: Task = new Task();

task.run('Hello');
task.run(null);
