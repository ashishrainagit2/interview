// https://www.youtube.com/watch?v=kuirGzhGhyw

function Developer(name) {
    this.name = name;
    this.type = "Developer";
}

function Tester(name) {
    this.name = name;
    this.type = "Tester";
}

function EmployeeFactory() {
    this.create = (name, type) => {
        switch (type) {
            case "Developer":
                return new Developer(name);
            case "Tester":
                return new Tester(name);
            default:
                return null;
        }
    }
}

/*
  Factory pattern (Simple Factory) — one place creates the right object.

  Products:  Developer, Tester  (different "types" of employee)
  Factory:   EmployeeFactory.create(name, type)
  Caller:    does NOT do new Developer() — asks factory instead

  Flow:
    create("John", "Developer") → switch → new Developer("John")

  Note: folder says FACTORY_METHOD; this is Simple Factory.
  Formal Factory Method = subclasses (CarFactory, BikeFactory) each override create().
*/

const employeeFactory = new EmployeeFactory();
const employee1 = employeeFactory.create("John", "Developer");
const employee2 = employeeFactory.create("Jane", "Tester");
console.log(employee1);
console.log(employee2);

/*
  USE CASES — when you need this

  1. Payment checkout (Flipkart/Amazon)
     createPayment("upi" | "card" | "cod") → right handler, checkout page stays simple

  2. Notifications
     createNotification("email" | "sms" | "push") → one API, many channels

  3. UI components by type
     createChart("bar" | "line" | "pie") → dashboard doesn't import every chart class

  4. Auth / social login
     createAuthProvider("google" | "github") → same login button, different provider

  5. Export / report
     createExporter("pdf" | "csv" | "xlsx") → add new format = one new case/class, not 20 if/else in UI

  WHY not new X() everywhere?
  - One place to create objects (easy to change)
  - Caller doesn't care about concrete class
  - Add new type = extend factory, not scatter new Developer() across app

  Interview one-liner:
  "When object type depends on input and I don't want if/else new Foo() everywhere, I use a factory."
*/

/*
  Q: In factory, why not create all objects separately?

  A: You CAN — for 2 types in one file, this is fine:
       const dev = new Developer("John")
       const tester = new Tester("Jane")

     Factory pays off when creation spreads and varies:

  1. Type decided at runtime
     User picks UPI / card / COD — you don't know the class until click.
     Factory: createPayment(type) — one call, not if/else in every screen.

  2. Duplicated creation logic
     Ten places with if (type === "Developer") new Developer(name) ...
     Change how Developer is built → fix 10 files. Factory → fix one switch.

  3. Caller shouldn't know concrete classes
     Checkout: "pay with this method" — shouldn't import UpiPayment, CardPayment, CodPayment.
     createPayment(type).pay() — less coupling.

  4. Easy to add types
     New Designer → add class + one case. Call sites stay create(name, "Designer").

  5. Hide messy setup
     Some objects need config / validation before new. Factory hides that.

  When separate new is OK:
  - Two objects, one file, never grows
  - Type always known at write time (always new Developer)

  One line: Factory = one door for "give me the right object for this type."
  Separate new everywhere = same decision copied in many places.
*/
