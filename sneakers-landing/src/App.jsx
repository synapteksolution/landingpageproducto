import { useState } from "react"
import { ShoppingBag, Star, Zap, Shield, Wind, X, Check } from "lucide-react"

const images = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
]

const reviews = [
  { name: "Carlos M.", rating: 5, text: "Las mejores zapatillas que he comprado. Comodísimas desde el primer día.", avatar: "C" },
  { name: "Laura P.", rating: 5, text: "El diseño es increíble, recibo cumplidos cada vez que las uso.", avatar: "L" },
  { name: "Andrés R.", rating: 4, text: "Calidad premium, vale cada peso. Las uso para todo.", avatar: "A" },
]

const sizes = [38, 39, 40, 41, 42, 43, 44]

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [modal, setModal] = useState(false)
  const [added, setAdded] = useState(false)

  const handleBuy = async () => {
    if (!selectedSize) {
      alert("Selecciona una talla primero")
      return
    }

    try {
      const response = await fetch("https://landingpageproducto-production.up.railway.app/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      window.location.href = data.url
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al procesar el pago")
    }
  }

  const handleAddCart = () => {
    if (!selectedSize) {
      alert("Selecciona una talla primero")
      return
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Compra Exitosa!</h3>
            <p className="text-gray-400 mb-1">Talla seleccionada: <span className="text-white font-semibold">{selectedSize}</span></p>
            <p className="text-gray-400 mb-6">Recibirás tu pedido en 3-5 días hábiles.</p>
            <button onClick={() => setModal(false)} className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-[#1a1a1a]">
        <span className="text-xl font-black tracking-widest uppercase">VELOCE</span>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition hidden md:block">Características</a>
          <a href="#reviews" className="hover:text-white transition hidden md:block">Reseñas</a>
          <button onClick={handleBuy} className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">
            Comprar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-[#111] aspect-square">
            <img
              src={images[selectedImage]}
              alt="Sneaker"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NUEVO
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`rounded-xl overflow-hidden aspect-square border-2 transition ${selectedImage === i ? "border-white" : "border-transparent opacity-50 hover:opacity-80"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Edición Limitada</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">VELOCE<br />AIR PRO X</h1>
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#facc15" className="text-yellow-400" />
            ))}
            <span className="text-gray-400 text-sm ml-1">(128 reseñas)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black">$189.900</span>
            <span className="text-gray-500 line-through text-lg">$249.900</span>
            <span className="bg-red-500/20 text-red-400 text-sm font-bold px-2 py-1 rounded-lg">-24%</span>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Diseñadas para los que no se detienen. Tecnología de amortiguación avanzada, suela de tracción omnidireccional y materiales premium que duran.
          </p>

          {/* Tallas */}
          <div>
            <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Talla (EU)</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold border transition ${selectedSize === size
                    ? "bg-white text-black border-white"
                    : "border-[#333] text-gray-400 hover:border-white hover:text-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleBuy}
              className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Comprar Ahora
            </button>
            <button
              onClick={handleAddCart}
              className={`px-6 py-4 rounded-2xl font-bold border transition ${added
                ? "bg-green-500/20 border-green-500 text-green-400"
                : "border-[#333] text-gray-400 hover:border-white hover:text-white"
                }`}
            >
              {added ? <Check size={20} /> : "+"}
            </button>
          </div>

          <p className="text-gray-600 text-sm text-center">🚚 Envío gratis en pedidos superiores a $150.000</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-16 py-16 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Por qué elegir VELOCE</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={28} />, title: "Ultra Ligeras", desc: "Solo 280g. Siéntelas como si no llevaras nada. Tecnología de espuma de última generación." },
              { icon: <Shield size={28} />, title: "Durabilidad Total", desc: "Materiales resistentes al agua y desgaste. Garantía de 2 años incluida en cada par." },
              { icon: <Wind size={28} />, title: "Máxima Ventilación", desc: "Malla transpirable de alta densidad. Tus pies frescos durante todo el día." },
            ].map((f, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#333] transition">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <div className="flex gap-1">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} size={12} fill="#facc15" className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 md:px-16 py-20 bg-[#0f0f0f]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-gray-500 uppercase tracking-widest text-sm">Quedan solo 12 pares</p>
          <h2 className="text-4xl md:text-5xl font-black">¿Listo para<br />dar el siguiente paso?</h2>
          <p className="text-gray-400">No dejes que se agoten. Edición limitada, precio especial por tiempo limitado.</p>
          <button
            onClick={handleBuy}
            className="bg-white text-black px-12 py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition inline-flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            Comprar Ahora — $189.900
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-[#1a1a1a] text-center text-gray-600 text-sm">
        © 2025 VELOCE. Todos los derechos reservados.
      </footer>
    </div>
  )
}