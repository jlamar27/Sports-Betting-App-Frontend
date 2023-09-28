import React from 'react'

export default function Bet({ bet }) {
  console.log("in Bet Component ", bet);
  console.log("betType: ", bet.betType)
  return (
    <div className="match-card">
      <p>Type: {bet.betType}</p>
      <p>Subtype: {bet.subtype}</p>
      <p>Team: {bet.team}</p>
      <p>Point: {bet.point}</p>
      <p>Odds: {bet.price}</p>
      <p>Outcome: {bet.outcome}</p>
    </div>
  )
}
