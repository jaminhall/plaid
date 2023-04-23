class PlaidModel {
    constructor(data) {
      this.data = data;
      this.listeners = {};
    }
  
    getValue(key) {
      return this.data[key];
    }
  
    setValue(key, value) {
      this.data[key] = value;
      this.notifyListeners(key);
    }
  
    addListener(key, listener) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(listener);
    }
  
    removeListener(key, listener) {
      if (this.listeners[key]) {
        const index = this.listeners[key].indexOf(listener);
        if (index > -1) {
          this.listeners[key].splice(index, 1);
        }
      }
    }
  
    notifyListeners(key) {
      if (this.listeners[key]) {
        this.listeners[key].forEach(listener => listener(this.data[key]));
      }
    }
  }
  
  export default PlaidModel;
  