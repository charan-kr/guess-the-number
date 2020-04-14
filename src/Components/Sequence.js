import React, { useEffect, useState, memo } from 'react';

function Sequence({ranNum, maxNum, inputCount, inputSequence, msg}) {
      const [counter, setCounter] = useState(0);
      const [sequence, setSequence] = useState([])

      var count = 0;
      var logger= [];

      useEffect(() => {
            min_try();
      }, [maxNum, ranNum])

      const min_try = () => {
            count = 0;
            let min = 0;
            let max = maxNum;
            let sel;
            let i;
            for(i=min; i<=max; i++) {
                  
                  sel = Math.round((max - min)/2 + min)

                  logger[count] = sel;
                  count++;

                  if(ranNum === sel){
                        break;
                  }
                  else if( ranNum > sel) min = sel;
                  else max = sel
            } 
         setCounter(count);
         setSequence(logger); 
      }

      const seqStyle = () => {
           return  msg === 'correct' ? {color:'#fff'} : {color: '#000'}
      }

      return (
            <div>
                  {/* <div> 
                        minmum no of tries : {counter} Number of times tried : {inputCount}
                  </div> */}
                  <div className="comp">
                        computer : {counter}
                  </div>
                  <div className="computer">
                        {sequence.map(seq => (
                              <span style={seqStyle()} key={seq}>
                                    {seq}
                              </span>
                        ))}
                  </div>
                  <div className="play">
                        player : {inputCount}
                  </div>
                  <div className="player">
                        {inputSequence.map(seq => (
                              <span key={seq}>
                                    {seq}
                              </span>
                        ))}
                  </div>
                  
            </div>
      )
}

export default memo(Sequence) 
