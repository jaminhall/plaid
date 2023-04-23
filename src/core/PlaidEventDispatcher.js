export default class PlaidEventDispatcher {
    constructor() {
      this.listeners = new Map();
      this.value = null; // Add a value property
    }
  
    addEventListener(eventType, callback) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType).add(callback);
    }
  
    removeEventListener(eventType, callback) {
      if (this.listeners.has(eventType)) {
        this.listeners.get(eventType).delete(callback);
      }
    }
  
    dispatchEvent(eventType, eventPayload = {}) {
      if (this.listeners.has(eventType)) {
        const callbacks = this.listeners.get(eventType);
        callbacks.forEach(callback => {
          callback({ type: eventType, detail: eventPayload });
        });
      }
    }
  
    setValue(value) { // Add a setValue method
      this.value = value;
      this.dispatchEvent('change', { value: this.value });
    }
  }
  