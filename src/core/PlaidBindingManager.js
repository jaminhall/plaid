// PlaidBindingManager.js

class PlaidBindingManager {
    constructor() {
      this.bindings = [];
    }
  
    addBinding(binding) {
      this.bindings.push(binding);
    }
  
    removeBinding(binding) {
      const index = this.bindings.indexOf(binding);
      if (index !== -1) {
        this.bindings.splice(index, 1);
      }
    }
  
    removeBindingsForSource(source) {
      this.bindings = this.bindings.filter((binding) => binding.source !== source);
    }
  
    removeBindingsForTarget(target) {
      this.bindings = this.bindings.filter((binding) => binding.target !== target);
    }
  }
  
  export default PlaidBindingManager;
  
  