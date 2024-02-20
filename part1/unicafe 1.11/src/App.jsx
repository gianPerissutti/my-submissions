import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text !== "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{props.text}:</td>
        <td>{props.value}%</td>
      </tr>
    );
  }
};

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  let average = (props.good - props.bad) / (total)
  let positive = props.good / (total)
  if (total == 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="No feedback given" />
        </tbody>
      </table>
    )
  }
  else {
    return (

      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine text="positive" value={positive.toFixed(2)} />
          <StatisticLine text="all" value={total} />
        </tbody>
      </table>

    )
  }

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>

  )
}

export default App