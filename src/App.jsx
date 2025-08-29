import { useEffect, useState } from 'react'
import './App.css'
function App() {
  let [count, setCount] = useState(0)
  let [score,setScore]=useState(0)
  let [ans,setAns]=useState([])
  let [arr,setArr]=useState([])
  let [point,setPoint]=useState(-1)
  let [eff,setEff]=useState(0)
  useEffect(()=>{
    fetch('https://the-trivia-api.com/v2/questions').then((data)=>data.json()).then((data)=>{
      setArr(data)
      setAns([...data[count].incorrectAnswers,data[count].correctAnswer].toSorted())
    }).catch((err)=>{
      console.log(err)
    })
  },[eff])
  if (!arr.length) {
  return <h1 style={{ color: '#fff', textAlign: 'center' }}>...Loading</h1>
}

if (count > 9) {
  return (
    <div className="container">
      <div className="result">
        {score >= 7 ? `Passed: ${score} out of 10` : `Failed: ${score} out of 10`}
      </div>
      <button
        onClick={() => {
          setCount(0)
          setScore(0)
          setAns([])
          setArr([])
          setPoint(-1)
          setEff(++eff)
        }}
      >
        Restart
      </button>
    </div>
  )
}

return (
  <div className="container">
    <div className="question">{arr[count].question.text}</div>
    <div className="options">
      {ans.map((cv, ci) => {
        return (
          <label key={ci} htmlFor={ci}>
            <input
              checked={point == ci}
              type="radio"
              value={ci}
              onChange={(e) => setPoint(e.target.value)}
              name="option"
              id={ci}
            />
            {cv}
          </label>
        )
      })}
    </div>
    <button
      onClick={() => {
        if (arr[count].correctAnswer == ans[point]) {
          setScore(++score)
        }
        setCount(++count)
        setPoint(-1)
        if (count <= 9) {
          setAns([...arr[count].incorrectAnswers, arr[count].correctAnswer].toSorted())
        }
      }}
    >
      Next
    </button>
  </div>
)

}
export default App