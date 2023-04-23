class PlaidView {
    constructor(element) {
      this.element = element;
    }
  
    getValue() {
      return this.element.value;
    }
  
    setValue(value) {
      this.element.value = value;
      this.element.dispatchEvent(new Event('input'));
    }
  
    addEventListener(type, listener) {
      this.element.addEventListener(type, listener);
    }
  
    removeEventListener(type, listener) {
      this.element.removeEventListener(type, listener);
    }
  }
  
  export default PlaidView;
  