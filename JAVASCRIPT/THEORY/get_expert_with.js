// object and looping with it
// map and sets
// reduce, filter and map

// Lot of different data transformation

const user = {
    name: "Amit",
    age: 28,
    city: "Pune",
    role: "Frontend",
    isActive: true,
  };

// ============================================================
// COMMON USES OF OBJECT LOOPING (websites + React)
// ============================================================
// Objects are "keyed bags of data". We loop them when the UI
// or API work is driven by keys, not by a numbered list.
// Prefer Object.entries / Object.keys / Object.values.
// Avoid for...in in React (it also walks inherited keys).


// 1. Render a profile / details card
//    Backend sends one user object. UI shows every field as a row.
//    React: Object.entries(user).map(([key, value]) => <p>{key}: {value}</p>)

Object.entries(user).forEach(([key, value]) => {
  console.log(key, ":", value);
});


// 2. Form fields from a config object
//    One object = labels + current values. Loop to draw inputs.
//    Used in settings pages, checkout, admin forms.

const formValues = { email: "", password: "", city: "Pune" };

Object.keys(formValues).forEach((field) => {
  // <input name={field} value={formValues[field]} />
  console.log("render input for", field, formValues[field]);
});


// 3. Show validation errors
//    APIs / form libs return { email: "Required", password: "Too short" }
//    Loop the error object and print a message under each input.

const errors = { email: "Required", password: "Too short" };

Object.entries(errors).forEach(([field, message]) => {
  console.log(field, "->", message);
});


// 4. Build a query string / API params
//    Filters on a listing page: { city: "Pune", role: "Frontend" }
//    Loop the object to make ?city=Pune&role=Frontend

const filters = { city: "Pune", role: "Frontend", isActive: true };

const query = Object.entries(filters)
  .map(([key, value]) => key + "=" + encodeURIComponent(value))
  .join("&");

console.log(query); // city=Pune&role=Frontend&isActive=true


// 5. Dropdown / filter options
//    Object is used as a lookup: value -> label
//    React: Object.entries(roles).map(([value, label]) => <option>)

const roles = { fe: "Frontend", be: "Backend", qa: "QA" };

Object.entries(roles).forEach(([value, label]) => {
  console.log("<option value=" + value + ">" + label + "</option>");
});


// 6. Feature flags / permissions
//    { darkMode: true, chat: false } — loop and turn features on/off
//    Same idea for user permissions: { canEdit: true, canDelete: false }

const flags = { darkMode: true, chat: false, newCheckout: true };

Object.entries(flags).forEach(([feature, enabled]) => {
  if (enabled) console.log("enable", feature);
});


// 7. Cart / keyed items (React state is often an object, not an array)
//    { "sku-1": { name: "Watch", qty: 2 }, "sku-2": { name: "Belt", qty: 1 } }
//    Loop values to render rows and compute total.

const cart = {
  "sku-1": { name: "Watch", qty: 2, price: 100 },
  "sku-2": { name: "Belt", qty: 1, price: 40 },
};

let total = 0;
Object.values(cart).forEach((item) => {
  total += item.qty * item.price;
});
console.log("cart total", total); // 240


// 8. Clean / transform an API object before sending
//    Strip empty fields, rename keys, pick only what the API wants.

const payload = { name: "Amit", city: "", role: "Frontend", extra: null };

const cleaned = {};
Object.entries(payload).forEach(([key, value]) => {
  if (value) cleaned[key] = value;
});
console.log(cleaned); // { name: "Amit", role: "Frontend" }


// 9. Update many React state fields at once
//    Incoming patch object: loop keys and merge into state.
//    setUser(prev => ({ ...prev, ...patch }))

const patch = { city: "Mumbai", isActive: false };
const updatedUser = { ...user };

Object.entries(patch).forEach(([key, value]) => {
  updatedUser[key] = value;
});
console.log(updatedUser);


// 10. Table columns from object keys
//     First row of API data decides headers. Loop keys to draw <th>.

const columns = Object.keys(user);
console.log("table headers", columns);


// QUICK PICK — which loop to use
// Object.keys(obj)    -> need the field names (forms, columns, query keys)
// Object.values(obj)  -> need the data only (cart total, list of labels)
// Object.entries(obj) -> need both (render UI rows, errors, options)