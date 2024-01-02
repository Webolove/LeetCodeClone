'use client'
import React, { useState } from 'react'
import Split from 'react-split'
import ProblemDesc from './ProblemDesc/ProblemDesc'
import Playground from './Playground/Playground'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function WorkSpace({ problemType }) {
  const { width, height } = useWindowSize()
  const [success, setSuccess] = useState(false);
  const [localSolved, setLocalSolved] = useState(false);

  return (
    <div>
      <Split className="split" sizes={[40, 60]}>
        <ProblemDesc problemDesc={problemType} localSolved={localSolved} />
        <Playground setSuccess={setSuccess} problemType={problemType} setLocalSolved={setLocalSolved} />
        {success && <Confetti
          gravity={0.3}
          tweenDuration={3000}
          width={width}
          height={height}
          recycle={false}
        />}
      </Split>
    </div>
  )
}
