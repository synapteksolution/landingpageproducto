import express from "express"
import Stripe from "stripe"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "cop",
                        product_data: {
                            name: "VELOCE AIR PRO X",
                            description: "Edición Limitada",
                            images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
                        },
                        unit_amount: 18990000, // $189.900 en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        })

        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(4000, () => console.log("Servidor corriendo en puerto 4000"))