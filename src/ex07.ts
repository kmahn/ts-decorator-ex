function Enumerable2(value: boolean): MethodDecorator {
  return <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    descriptor.enumerable = value;
  };
}

class Point {
  constructor(private _x: number, private _y: number) {
  }

  // @Enumerable(false)
  get x(): number {
    return this._x;
  }

  @Enumerable2(true)
  get y(): number {
    return this._y;
  }
}

const point = new Point(10, 20);
console.log(point.x, point.y);
for(let key in point) {
  console.log(key);
}
