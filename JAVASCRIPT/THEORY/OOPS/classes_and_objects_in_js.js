class Person {
  constructor(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
  }

  greet() {
    return `Hi, I am ${this.name} from ${this.city}.`;
  }

  haveBirthday() {
    this.age += 1;
    return `${this.name} is now ${this.age}.`;
  }

  getDetails() {
    return {
      name: this.name,
      age: this.age,
      city: this.city,
    };
  }
}

class Athlete extends Person {
  constructor(name, age, city, sport) {
    super(name, age, city);
    this.sport = sport;
  }

  play() {
    return `${this.name} plays ${this.sport}.`;
  }
}

const ada = new Person("Ada", 36, "London");
console.log(ada.greet());

const usain = new Athlete("Usain", 38, "Kingston", "sprint");
console.log(usain.greet());
console.log(usain.play());


// 2. Encapsulation — hide data, touch it only through methods
class BankAccount {
  #balance = 0; // private: cannot do account.#balance from outside

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
// console.log(acc.#balance); // SyntaxError — that's the point


// 3. Polymorphism — same method name, different behavior
class Animal {
  speak() {
    return "...";
  }
}

class Dog extends Animal {
  speak() {
    return "woof";
  }
}

class Cat extends Animal {
  speak() {
    return "meow";
  }
}

const pets = [new Dog(), new Cat(), new Animal()];
pets.forEach((pet) => console.log(pet.speak()));
// woof
// meow
// ...


// 4. Abstraction — you call one method; the messy steps stay hidden
class CoffeeMachine {
  brew() {
    this.#heatWater();
    this.#pour();
    return "coffee";
  }

  #heatWater() {}
  #pour() {}
}

const machine = new CoffeeMachine();
console.log(machine.brew()); // "coffee"
// you never call #heatWater / #pour from outside
