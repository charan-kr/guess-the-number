import React, { useState, useEffect } from 'react'
import Sequence from './Sequence'

import './style.css';

function GameComponent() {
      const [minNum, setminNum] = useState(0);
      const [maxNum, setMaxNum] = useState(10);
      const [ranNum, setRanNum] = useState(0);
      const [selNum, setSelNum] = useState('');
      const [msg, setMsg] = useState('Start the game');

      const [inputCount, setInputCount] = useState(0);
      const [inputSequence, setInputSequence] = useState([])
      const [level, setLevel] = useState('EASY');


      useEffect(()=> {
            setRanNum(Math.round(Math.random()*10))
      },[])

      const handleChange = (e) => {
            setSelNum(parseInt(e.target.value));
      }

      const checkInput = (e) => {
            if(e.key === 'Enter') checkStatus() 
      }

      const checkStatus = () => {
            
            let check = true;
            inputSequence.forEach(ele => {
                  if(ele === selNum)
                        check = false;   
            });

            if(selNum !== '' && check)
            {   
                  setInputSequence([...inputSequence, selNum])
                  setInputCount(prevstate => prevstate + 1);
                  if(selNum === ranNum) setMsg('correct');
                  else if(selNum > ranNum) setMsg(' Go for smaller number')
                  else setMsg(' Go for bigger Number')
                  setSelNum('')
            }  else if(!check) setMsg('You checked this number before')
      }

      const handleLevel = (val) => {
            setInputSequence([]);
            setInputCount(0);
            setMsg('Start the game');
            setminNum(0);
            setMaxNum(val);
            setRanNum(Math.round(Math.random()*val))
            let level  = val > 100 ? 'HARD' : val > 10 ? 'MEDIUM' : 'EASY';
            setLevel(level)
            setSelNum('')
      }

      const reset = () => {
            setInputSequence([]);
            setInputCount(0);
            setMsg('Start the game');
            setRanNum(Math.round(Math.random()*maxNum))
      }
      
      const levelStyle = (level) => {
            
          return level === 'HARD' ? {color: 'red'} : 
                  level === 'MEDIUM' ? {color: 'orange'} : {color: 'lightgreen'};
            

      }

      return (
            <div className="container">
                  <h3 style={levelStyle(level)}>
                        <span style={{color:"#000"}}>LEVEL : </span>
                        {level}
                  </h3>
            <header>
                  <h4>GAME..!!!! GUESS THE NUMBER</h4>
            </header>
            <div className="wrapper">
                  <span className="random-number">
                              <span className="ran">
                                    {msg === 'correct' ? ranNum: 
                                          <i className="fa fa-question" aria-hidden="true"></i>
                                    }
                              </span>
                        <span className="num">Range is <strong>{minNum} to {maxNum}</strong></span>
                  </span>
                  {msg === 'correct' ? 
                        <div>
                              <h1 className="won">you won</h1>
                              <button onClick={reset} className="neon-button">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    PLAY AGAIN
                              </button>
                        </div> :
                  
                        <div className="container">
                              <input onChange={handleChange} onKeyUp={checkInput} type="number" value = {selNum} />
                              <button onClick={checkStatus} className="btn btn-secondary">check</button>
                              <span>
                                    <button onClick={() => handleLevel(10)} className="btn btn-primary">EASY</button>
                                    <button onClick={() => handleLevel(100)} className="btn btn-info">MEDIUM</button>
                                    <button onClick={() => handleLevel(1000)} className="btn btn-warning">HARD</button>
                              </span>
                              <span className="message-box">
                              <span>hint : <i className="fa fa-commenting" aria-hidden="true"></i></span> 
                              <p className="msg">
                                    {msg}
                              </p>    
                              </span>
                        </div>
                  }
                  <Sequence 
                        ranNum={ranNum} 
                        maxNum={maxNum} 
                        inputCount={inputCount} 
                        inputSequence={inputSequence}
                        msg ={msg}
                  />
            </div>
            <div className="developer">
                  <p>Developed by <kbd>charan</kbd></p>
                  <p>open Source <code><strong>project</strong></code></p>
                  <p> <i class="fa fa-github" aria-hidden="true"></i> Gitub link <a target="_blank" href="https://github.com/charan-kr/guess-the-number"><i> Guess the number </i></a></p>
            </div>
      </div>
      )
}

export default GameComponent
