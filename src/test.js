import PlaidBinding from './core/PlaidBinding';
import PlaidBindingManager from './core/PlaidBindingManager';
import PlaidComponent from './core/PlaidComponent';
import PlaidEvent from './core/PlaidEvent';
import PlaidEventDispatcher from './core/PlaidEventDispatcher';
import PlaidModel from './core/PlaidModel';
import PlaidView from './core/PlaidView';


class TestComponent extends PlaidComponent {
    constructor() {
      const parentElement = document.createElement('div');
      super(parentElement);
    }
  
    render() {
      return document.createElement('div');
    }
  }
  

describe('PlaidComponent', () => {
  let component;
  let parent;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
    component = new PlaidComponent(parent);
  });

  afterEach(() => {
    component.unmount();
    document.body.removeChild(parent);
  });

  test('render() throws error when called on base class', () => {
    expect(() => {
      PlaidComponent.prototype.render();
    }).toThrowError('render() method must be implemented');
  });

  test('setState() updates the component state', () => {
    expect(component.state).toEqual({});
    component.setState({ foo: 'bar' });
    expect(component.state).toEqual({ foo: 'bar' });
  });

  test('mount() appends the component element to parent element', () => {
    // create parent element
    const parent = document.createElement('div');
    
    // create component
    const component = new PlaidComponent(parent);
    component.render = () => document.createElement('div');
    
    // mount the component
    component.mount();
    
    // assert that the element is a child of the parent
    expect(parent.contains(component.element)).toBe(true);
  });

  test('unmount() removes the component element from parent element', () => {
    const el = component.element;
    component.unmount();
    expect(parent.contains(el)).toBe(false);
  });

  test('addEventListener() adds an event listener to the component element', () => {
    const component = new TestComponent();
    component.mount();
    const callback = jest.fn();
    component.addEventListener('click', callback);
    component.element.click();
    expect(callback).toHaveBeenCalled();
  });

  test('removeEventListener() removes an event listener from the component element', () => {
    const component = new TestComponent();
    component.mount();
    const callback = jest.fn();
    component.addEventListener('click', callback);
    
    // create the mouse event object
    const event = new MouseEvent('click');
    
    // dispatch the event
    component.element.dispatchEvent(event);
    expect(callback).toHaveBeenCalledTimes(1);
    
    // remove the event listener
    component.removeEventListener('click', callback);
    
    // dispatch the event again
    component.element.dispatchEvent(event);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  
  

  test('dispatchEvent() dispatches an event from the component element', () => {
    const callback = jest.fn();
    const event = new PlaidEvent('test');
    component.addEventListener('test', callback);
    component.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });
});

describe('PlaidBinding', () => {
  let binding;
  let source;
  let target;

  beforeEach(() => {
    source = new PlaidModel();
    target = new PlaidView();
    binding = new PlaidBinding(source, target);
  });

  test('constructor sets source and target', () => {
    expect(binding.source).toBe(source);
    expect(binding.target).toBe(target);
  });

  test('bind() sets target value to source value', () => {
    const source = { value: 'foo' };
    const target = { setValue: jest.fn(), value: '' };
    const binding = new PlaidBinding(source, target);
    binding.bind();
    expect(target.value).toBe('foo');
  });
  

  test('unbind() removes the binding between the source and target', () => {
    source.value = 'foo';
    binding.bind();
    binding.unbind();
    source.value = 'bar';
    expect(target.value).toBe('foo');
  });
});

describe('PlaidBindingManager', () => {
    let manager;
    let source;
    let target1;
    let target2;
    let target3;
    let binding1;
    let binding2;
    let binding3;
  
    beforeEach(() => {
      manager = new PlaidBindingManager();
      source = new PlaidModel();
      target1 = new PlaidView();
      target2 = new PlaidView();
      target3 = new PlaidView();
      binding1 = new PlaidBinding(source, target1);
      binding2 = new PlaidBinding(source, target2);
      binding3 = new PlaidBinding(source, target3);
      manager.addBinding(binding1, true);
      manager.addBinding(binding2, true);
      manager.addBinding(binding3, true);
    });
  
    test('addBinding() adds a binding to the manager', () => {
      expect(manager.bindings.length).toBe(3);
      expect(manager.bindings[0]).toBe(binding1);
      expect(manager.bindings[1]).toBe(binding2);
      expect(manager.bindings[2]).toBe(binding3);
    });
  
    test('removeBinding() removes a binding from the manager', () => {
      manager.removeBinding(binding2);
      expect(manager.bindings.length).toBe(2);
      expect(manager.bindings[0]).toBe(binding1);
      expect(manager.bindings[1]).toBe(binding3);
    });
  
    test('removeBindingsForSource() removes all bindings for a given source', () => {
      manager.addBinding(binding2, true);
      expect(manager.bindings.length).toBe(3);
      manager.removeBindingsForSource(source);
      expect(manager.bindings.length).toBe(0);
    });
  
    test('removeBindingsForTarget() removes all bindings for a given target', () => {
      manager.addBinding(binding1);
      manager.addBinding(binding2);
      manager.addBinding(binding3);
      expect(manager.bindings.length).toBe(3);
      manager.removeBindingsForTarget(target3);
      expect(manager.bindings.length).toBe(2);
      expect(manager.bindings[0]).toBe(binding1);
      expect(manager.bindings[1]).toBe(binding2);
    });
  
    test('removeBindingsForSource() removes all bindings for a given source', () => {
      manager.addBinding(binding1);
      manager.addBinding(binding2);
      manager.addBinding(binding3);
      expect(manager.bindings.length).toBe(3);
      manager.removeBindingsForSource(source);
      expect(manager.bindings.length).toBe(1);
      expect(manager.bindings[0]).toBe(binding3);
    });
  
    test('removeBindingsForTarget() removes all bindings for a given target', () => {
      manager.addBinding(binding1);
      manager.addBinding(binding2);
      manager.addBinding(binding3);
      expect(manager.bindings.length).toBe(3);
      manager.removeBindingsForTarget(target3);
      expect(manager.bindings.length).toBe(2);
      expect(manager.bindings[0]).toBe(binding1);
      expect(manager.bindings[1]).toBe(binding2);
    });
  });
  
  describe('PlaidView', () => {
    let view, element;
  
    beforeEach(() => {
      element = document.createElement('input');
      view = new PlaidView(element);
    });
  
    test('constructor sets the element property', () => {
      expect(view.element).toBe(element);
    });
  
    test('getValue returns the element value', () => {
      element.value = 'test value';
      expect(view.getValue()).toBe('test value');
    });
  
    test('setValue sets the element value', () => {
      view.setValue('test value');
      expect(element.value).toBe('test value');
    });
  });

  describe('PlaidEvent', () => {
    test('constructor sets type and detail properties', () => {
      const type = 'customEvent';
      const detail = { data: '123' };
      const event = new PlaidEvent(type, detail);
      expect(event.type).toBe(type);
      expect(event.detail).toBe(detail);
    });
  });
  
  describe('PlaidEventDispatcher', () => {
    let dispatcher, listener1, listener2, event1, event2;
  
    beforeEach(() => {
      dispatcher = new PlaidEventDispatcher();
      listener1 = jest.fn();
      listener2 = jest.fn();
      event1 = new PlaidEvent('event1', { data: 'data1' });
      event2 = new PlaidEvent('event2', { data: 'data2' });
    });
  
    test('addEventListener adds an event listener', () => {
      dispatcher.addEventListener('event1', listener1);
      expect(dispatcher.eventListeners.event1[0]).toBe(listener1);
    });
  
    test('removeEventListener removes an event listener', () => {
      dispatcher.addEventListener('event1', listener1);
      dispatcher.removeEventListener('event1', listener1);
      expect(dispatcher.eventListeners.event1.length).toBe(0);
    });
  
    test('dispatchEvent dispatches an event to all registered listeners', () => {
        const dispatcher = new PlaidEventDispatcher();
        const listener1 = jest.fn();
        const listener2 = jest.fn();
        dispatcher.addEventListener('event1', listener1);
        dispatcher.addEventListener('event1', listener2);
        const event1 = { type: 'event1', data: { data: 'data1' } };
        dispatcher.dispatchEvent(event1);
        expect(listener1).toHaveBeenCalledWith(event1);
        expect(listener2).toHaveBeenCalledWith(event1);
    });
      
    test('dispatchEvent dispatches an event to only listeners of the specified type', () => {
       const dispatcher = new PlaidEventDispatcher();
       const listener1 = jest.fn();
       const listener2 = jest.fn();
       dispatcher.addEventListener('event1', listener1);
       dispatcher.addEventListener('event2', listener2);
       const event1 = { type: 'event1', data: { data: 'data1' } };
       const event2 = { type: 'event2', data: { data: 'data2' } };
       dispatcher.dispatchEvent(event1);
       expect(listener1).toHaveBeenCalledWith(event1);
       expect(listener2).not.toHaveBeenCalled();
       dispatcher.dispatchEvent(event2);
       expect(listener2).toHaveBeenCalledWith(event2);
       expect(listener1).not.toHaveBeenCalledWith(event2);
    });
      
      
  });
  
  
  