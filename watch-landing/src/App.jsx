import { useEffect, useMemo, useState } from 'react'

const API_URL = 'https://dummyjson.com/products/search?q=watch'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchWatches = async () => {
      try {
        setLoading(true)
        const res = await fetch(API_URL)
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`)
        }
        const data = await res.json()
        if (!mounted) return
        setProducts(data.products ?? [])
        setError('')
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unable to load watches right now.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchWatches()
    return () => {
      mounted = false
    }
  }, [])

  const featured = useMemo(() => products.slice(0, 6), [products])

  const averagePrice = useMemo(() => {
    if (!products.length) return 0
    const total = products.reduce((sum, item) => sum + item.price, 0)
    return Math.round(total / products.length)
  }, [products])

  const brandCount = useMemo(() => {
    const uniqueBrands = new Set(products.map((item) => item.brand))
    return uniqueBrands.size
  }, [products])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Minimal Watch Collection
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Crafted timepieces for modern everyday style.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Discover a clean lineup of watches fetched from a real product API, presented in a calm, minimal interface.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#featured"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Explore Collection
            </a>
            <a
              href="#story"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Our Story
            </a>
          </div>
        </header>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Products Loaded</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{products.length || '--'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Average Price</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {averagePrice ? `$${averagePrice}` : '--'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Brands Available</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{brandCount || '--'}</p>
          </div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Featured Watches</h2>
            <p className="mt-2 text-slate-600">Live data from a free public products API.</p>
          </div>
          <span className="rounded-full border border-slate-300 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            API Powered
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Could not load featured watches.</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            No watches found right now. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-52 w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.brand}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-4 text-xl font-bold text-slate-900">${item.price}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="story" className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">A Story of Precision</h2>
            <p className="mt-4 text-slate-600">
              We curate watches that balance clean aesthetics, reliable craftsmanship, and everyday comfort. Every model
              in our collection is selected to match modern lifestyles.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Why People Choose Us</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Handpicked models with elegant, timeless designs</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Fast shipping and straightforward support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">What Customers Say</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            'Super clean look and very comfortable strap quality.',
            'Delivery was fast and the watch feels premium for the price.',
            'Exactly what I wanted for a minimalist daily accessory.',
          ].map((quote, idx) => (
            <blockquote key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-slate-700">"{quote}"</p>
              <footer className="mt-4 text-sm font-semibold text-slate-500">Verified Buyer</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Stay in the Loop</h2>
          <p className="mt-3 text-slate-600">Get product drops, launch alerts, and minimal style tips.</p>
          <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm outline-none ring-slate-300 focus:ring-2"
            />
            <button
              type="button"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">FAQ</h2>
        <div className="mt-8 space-y-4">
          {[
            ['Do these products come from a real API?', 'Yes. The featured grid is fetched from dummyjson.com in real time.'],
            ['Is this design mobile responsive?', 'Yes. Layouts adapt for mobile, tablet, and desktop using Tailwind utility classes.'],
            ['Can we switch to another API later?', 'Absolutely. The API URL is centralized and easy to replace with your preferred provider.'],
          ].map(([q, a], idx) => (
            <details key={idx} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">{q}</summary>
              <p className="mt-2 text-sm text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Minimal Watches. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
