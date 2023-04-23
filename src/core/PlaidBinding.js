import PlaidEventDispatcher from './PlaidEventDispatcher.js';

export default class PlaidBinding {
  constructor(source, target) {
    this.source = source;
    this.target = target;
    this.model = new PlaidEventDispatcher();
    this.view = new PlaidEventDispatcher();
    this.model.addEventListener('change', () => {
      this.updateView();
    });
  }

  updateView(event) {
    const newValue = event.detail.value;
    if (newValue !== this.target.getValue()) {
      this.target.setValue(newValue);
    }
  }
  

  bind() {
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.view.addEventListener('change', this.handleViewChange);
    this.model.addEventListener('change', this.handleModelChange);
    this.updateView();
  }

  unbind() {
    this.view.removeEventListener('change', this.handleViewChange);
    this.model.removeEventListener('change', this.handleModelChange);
  }

  handleViewChange(event) {
    this.model.setValue(event.detail);
  }

  handleModelChange(event) {
    this.updateView();
  }
}
