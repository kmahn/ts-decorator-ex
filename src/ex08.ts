const Doubled = (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<number>) => {
  const getter = descriptor.get;
  if (!getter) throw new Error('is not getter');

  descriptor.get = function () {
    const result = getter.apply(this) * 2;
    return result;
  };

  return descriptor;
}

class DoublePoint {
  constructor(private _x: number, private _y: number) {}

  @Doubled
  get x(): number {
    return this._x;
  }

  @Doubled
  get y(): number {
    return this._y;
  }
}

const p = new DoublePoint(10, 20);
console.log(p.x, p.y);
