import {ForwardedRef} from 'react';

function mergeRefs<T = any>(...refs: ForwardedRef<T>[]) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export {mergeRefs};
