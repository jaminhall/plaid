class PlaidView {
    constructor(element) {
      this.element = element;
    }
  
    getValue() {
      return this.element.value;
    }
  
    setValue(value) {
      this.element.value = value;
    }
  
    addEventListener(eventName, handler) {
      this.element.addEventListener(eventName, handler);
    }
  
    removeEventListener(eventName, handler) {
      this.element.removeEventListener(eventName, handler);
    }
  }
  
  export default PlaidView;
  