function Min(limit: number): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    let value: string;

    const getter = function (): string {
      return value;
    };

    const setter = function (newValue: string) {
      if (newValue.length < limit) throw new Error('Invalid Min Length');
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

class Auth {
  username: string;

  @Min(4)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

try {
  const auth1 = new Auth('user1', 'asdf1234');
  console.log(auth1);
  console.log(auth1.username, auth1.password);

  const auth2 = new Auth('user2', 'asd'); // Error
  console.log(auth2);
  console.log(auth2.username, auth2.password);
} catch (e: any) {
  console.error(e.message);
}
