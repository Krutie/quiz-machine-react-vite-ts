import React from 'react';

interface ScoreProps {
  correct: number,
  incorrect: number
}

export default function Score({ correct, incorrect }: ScoreProps) {
  return (
    <div className="score">
      <div className="count correct">
        { correct }
      </div>
      <div className="count incorrect">
        { incorrect }
      </div>
    </div>
  )
}