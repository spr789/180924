type EventType = 'page_view' | 'click' | 'purchase' | 'add_to_cart' | 'remove_from_cart'

interface AnalyticsEvent {
  type: EventType
  properties?: Record<string, any>
}

export const analytics = {
  track(event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === 'production') {
      try {
        // Send to analytics service
        console.log('Analytics event:', event)
      } catch (error) {
        console.error('Analytics error:', error)
      }
    }
  },

  pageView(path: string): void {
    this.track({
      type: 'page_view',
      properties: { path },
    })
  },

  purchase(orderId: string, amount: number): void {
    this.track({
      type: 'purchase',
      properties: { orderId, amount },
    })
  },

  addToCart(productId: string, quantity: number): void {
    this.track({
      type: 'add_to_cart',
      properties: { productId, quantity },
    })
  },

  removeFromCart(productId: string): void {
    this.track({
      type: 'remove_from_cart',
      properties: { productId },
    })
  },
}