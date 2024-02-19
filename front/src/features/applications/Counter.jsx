import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  incrementAsync,
  decrementAsync,
} from '../../store/counter/counterSlice.jsx';

import LoadingBloc from '../../components/LoadingBloc.jsx';

import { IconContext } from 'react-icons';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const loaded = useSelector((state) => state.counter.loaded);
  const dispatch = useDispatch();

  const [numberDecrement, setNumberDecrement] = useState(0);
  const [numberIncrement, setNumberIncrement] = useState(0);

  return (
    <IconContext.Provider value={{ size: '40px', className: 'react-icons' }}>
      <h1>Counter app</h1>
      <div className="main-app">
        <div className="count-bloc">
          <div className="count-bloc__buttons">
            <div className="button-icon">
              <button onClick={() => dispatch(decrement())}>
                <FaMinusCircle />
              </button>
            </div>
            <div className="button-icon">
              <button onClick={() => dispatch(decrementByAmount(10))}>
                <FaMinusCircle />
              </button>
              <p>10</p>
            </div>
            <div className="button-icon">
              <button onClick={() => dispatch(decrementAsync(10))}>
                <FaMinusCircle />
              </button>
              <p>10 Async</p>
            </div>
            <div className="button-icon">
              <button
                onClick={() => {
                  dispatch(decrementAsync(numberDecrement));
                  setNumberDecrement(0);
                }}
              >
                <FaMinusCircle />
              </button>
              <input
                id="number_decrement"
                type="number"
                autoComplete="off"
                required
                min="0"
                onChange={(e) =>
                  setNumberDecrement(Math.abs(Number(e.target.value)))
                }
                value={numberDecrement}
              ></input>
            </div>
          </div>
          <p className="count-bloc__content">{count}</p>
          <div className="count-bloc__buttons">
            <div className="button-icon">
              <button onClick={() => dispatch(increment())}>
                <FaPlusCircle />
              </button>
            </div>
            <div className="button-icon">
              <button onClick={() => dispatch(incrementByAmount(10))}>
                <FaPlusCircle />
              </button>
              <p>10</p>
            </div>
            <div className="button-icon">
              <button onClick={() => dispatch(incrementAsync(10))}>
                <FaPlusCircle />
              </button>
              <p>10 Async</p>
            </div>
            <div className="button-icon">
              <button
                onClick={() => {
                  dispatch(incrementAsync(numberIncrement));
                  setNumberIncrement(0);
                }}
              >
                <FaPlusCircle />
              </button>
              <input
                id="number_increment"
                type="number"
                autoComplete="off"
                required
                min="0"
                onChange={(e) =>
                  setNumberIncrement(Math.abs(Number(e.target.value)))
                }
                value={numberIncrement}
              ></input>
            </div>
          </div>
          {loaded === 0 ? <LoadingBloc /> : null}
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Counter;
