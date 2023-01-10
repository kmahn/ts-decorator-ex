import 'reflect-metadata';

const FORMAT = Symbol('FORMAT');

function Format(format: string): PropertyDecorator {
  return Reflect.metadata(FORMAT, format);
}

class Intro {

  @Format('My name is %s~')
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  introduce(): string {
    const formatString = Reflect.getMetadata(FORMAT, this, 'name');
    return formatString.replace('%s', this.name);
  }
}

const intro = new Intro('Lee');
console.log(intro.introduce());
