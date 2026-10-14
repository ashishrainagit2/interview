const a = {};
const b = { key: "b" };
const c = { key: "c" };
 
a[b] = 123;
a[c] = 456;
 
console.log(a[b]);

// a[b] = 123  // a["[object Object]"] = 123
// a[c] = 456  // a["[object Object]"] = 456  ← same key, overwrites

//ANSWER: 456

const obj = {
    value: 10,
    arrow: () => console.log(this.value),
    regular() { console.log(this.value); }
};
obj.arrow();
obj.regular();

//undefined
//10


console.log(d);
let d = 5;
//Uncaught ReferenceError: b is not defined

// Mangoose connection 
//select query 

const express = require('express')
const mongoose = require('mongoose')

const app = express()

// 1) connect
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))

// 2) schema + model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const User = mongoose.model('User', userSchema)

// 3) GET API — fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find() // get data from MongoDB
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// optional: get one by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('Server on 3000'))


// stream vs buffer
//
// Buffer = whole chunk of data in memory at once (finite bytes)
// Stream = data flows piece by piece (don't load everything in RAM)
//
// Use Buffer: small files, crypto hashes, short responses
// Use Stream: big files, video, logs, HTTP upload/download
//
// ----- Buffer example -----
const fs = require('fs')

// loads ENTIRE file into memory
const buf = fs.readFileSync('./big.mp4') // Buffer
console.log(buf.length) // all bytes at once

// ----- Stream example -----
const readStream = fs.createReadStream('./big.mp4') // chunks
const writeStream = fs.createWriteStream('./copy.mp4')

readStream.on('data', (chunk) => {
  // chunk is a Buffer piece, not the whole file
  console.log('got chunk', chunk.length)
})

readStream.pipe(writeStream) // stream → stream (efficient)

// HTTP: res is a writable stream
// app.get('/video', (req, res) => {
//   fs.createReadStream('./big.mp4').pipe(res)
// })
//
// Interview one-liner:
// Buffer = all data in memory; Stream = process in chunks so large data stays cheap.


// cluster in node js
//
// Problem: one Node process = one CPU core (JS is single-threaded for your code)
// Cluster: fork multiple workers that share the same port → use all cores
//
// master (primary)  → forks workers
// workers           → each runs the same server code
// OS load-balances incoming connections across workers
//
// ----- example (Express) -----
const cluster = require('cluster')
const os = require('os')
const express = require('express')

// cluster.isPrimary is true only in the main process that forks workers 

if (cluster.isPrimary) {
  // (older Node: cluster.isMaster)
  const cpus = os.cpus().length
  console.log(`Primary ${process.pid}. Forking ${cpus} workers`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
//   It creates multiple workers (child processes), usually one per CPU core.

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`)
    cluster.fork() // optional: keep count stable
  })
} else {
  // each worker is a separate process — Express instead of http.createServer
  const app = express()

  app.get('/', (req, res) => {
    res.send(`Handled by worker ${process.pid}`)
  })

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`)
  })
}


// You run the file
//         │
//         ▼
//    Primary process          → if (cluster.isPrimary) → fork workers
//         │
//         ├── Worker 1        → else → Express.listen(3000)
//         ├── Worker 2        → else → Express.listen(3000)
//         └── Worker N        → else → Express.listen(3000)

//
// Notes:
// - Good for CPU-heavy / scaling one machine
// - Workers don't share memory (use Redis etc. for shared session/cache)
// - Today many teams use PM2 cluster mode or Kubernetes instead of hand-rolled cluster
//
// Interview one-liner:
// cluster = multiple Node processes (one per core) sharing one port for better CPU use.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// are you saying, on primary, is created 8 workers, as 8 core 
// and these 8 workers will run again and all will go into else and create its own express?

// Yes — that’s correct.

// Primary (1 process) → sees isPrimary === true → forks 8 workers (because 8 cores).
// Each of those 8 workers is a new process that loads the same file again.
// In each worker, isPrimary === false → goes to else → starts its own Express on port 3000.
// So you get 8 Express servers (8 processes), sharing port 3000 via cluster.

// Workers do not fork more workers — they only hit else, not the if fork loop

// Primary ──fork──► Worker1 → Express
//        ──fork──► Worker2 → Express
//        ──fork──► ...
//        ──fork──► Worker8 → Express

