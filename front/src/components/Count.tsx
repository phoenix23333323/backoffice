import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store.ts';
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from '../store/counter/counterSlice.ts';
import LoadingBloc from './LoadingBloc.jsx';

function Count() {
  const count = useSelector((state: RootState) => state.counter.value);
  const loaded = useSelector((state: RootState) => state.counter.loaded);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="count-bloc">
      <h2>COUNT APPLICATION</h2>
      <p className="count-bloc__content">{count}</p>
      <div className="count-bloc__buttons">
        <button className="button" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button
          className="button"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment by 10
        </button>
        <button className="button" onClick={() => dispatch(incrementAsync(10))}>
          Increment by 10 Async
        </button>
        <button className="button" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
      {loaded === 0 ? <LoadingBloc /> : null}
    </div>
  );
}

export default Count;
