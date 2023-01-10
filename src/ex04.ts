function Reportable<T extends {new (...args: any[]): {}}>(constructor: T) {
  return class extends constructor {
    reportingUrl = 'https://www...';
    print() {
      console.log(this.reportingUrl);
    }
  };
}

@Reportable
class BugReport {
  type = 'report';
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

const bugReport = new BugReport('Need dark mode');
console.log(bugReport);
console.log(bugReport instanceof BugReport);
(bugReport as any).print();
