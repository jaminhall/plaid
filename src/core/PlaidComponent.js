class PlaidComponent {
    constructor(parentElement) {
      this.parentElement = parentElement;
      this.element = null;
      this.state = {};
      this.listeners = {};
    }
  
    // Render the component's UI
    render() {
      throw new Error('render() method must be implemented in subclass');
    }
  
    // Update the component's state
    setState(newState) {
      this.state = { ...this.state, ...newState };
      if (this.element) {
        this.render();
      }
    }
  
    // Mount the component to the DOM
    mount() {
        this.element = this.render();
        if (!this.element) {
        throw new Error('render() method must return an element');
        }
        this.parentElement.appendChild(this.element);
    }
  
      
  
  
    // Remove the component from the DOM
    unmount() {
      if (this.parentElement && this.element) {
        this.parentElement.removeChild(this.element);
      }
    }
  
    // Add an event listener to the component
    addEventListener(eventType, callback) {
      this.listeners[eventType] = this.listeners[eventType] || [];
      this.listeners[eventType].push(callback);
      if (this.element) {
        this.element.addEventListener(eventType, callback);
      }
    }
  
    // Remove an event listener from the component
    removeEventListener(eventType, callback) {
      const listeners = this.listeners[eventType];
      if (listeners) {
        this.listeners[eventType] = listeners.filter(
          (listener) => listener !== callback
        );
        if (this.element) {
          this.element.removeEventListener(eventType, callback);
        }
      }
    }
  
    // Dispatch an event from the component
    dispatchEvent(event) {
      const listeners = this.listeners[event.type] || [];
      listeners.forEach((listener) => listener(event));
    }
  }
  
  export default PlaidComponent;
  