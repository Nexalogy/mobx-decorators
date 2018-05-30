import {reaction as mobxReaction} from 'mobx'
import {attachInitializer, isPropertyDecorator} from '../utils'


export default function reaction(trackedDataFunction,invokeImmediately) {
//export default function observe(handler, invokeImmediately) {
  if (isPropertyDecorator(arguments)) {
    throw new Error("@reaction must be called with a tracked data function argument");
  }
  
  return (target, property, description) => {
    attachInitializer(target, property, store => {
      mobxReaction(trackedDataFunction, (data)=>{store[property](data)},invokeImmediately);
    });
    
    return description && {...description, configurable: true};
  }
}
