import { useEffect, useState } from 'react'
import { CartContext } from './cart-context.js'

const STORAGE_KEY = 'mini-shop-cart'

// Читаємо кошик із localStorage (або порожній масив)
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

// Зберігає кошик і дає всім компонентам функції для роботи з ним
function CartProvider({ children }) {
  // Елемент кошика: { id, title, price, thumbnail, stock, quantity }
  const [items, setItems] = useState(loadCart)

  // Після кожної зміни кошика зберігаємо його
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // сховище недоступне — кошик просто не збережеться
    }
  }, [items])

  // Обчислювані значення — не окремий state
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function getQuantity(id) {
    return items.find((item) => item.id === id)?.quantity ?? 0
  }

  function addToCart(product) {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id)

      // Товар уже є — збільшуємо кількість (але не більше, ніж є на складі)
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item,
        )
      }

      // Нового товару ще немає — додаємо його в кінець
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: 1,
      }
      return [...prevItems, newItem]
    })
  }

  function decreaseQuantity(id) {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0), // кількість 0 — прибираємо з кошика
    )
  }

  function removeFromCart(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const value = {
    items,
    totalCount,
    totalPrice,
    getQuantity,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext value={value}>{children}</CartContext>
}

export default CartProvider
