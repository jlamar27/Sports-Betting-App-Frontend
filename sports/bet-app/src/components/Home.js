import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import background from '../images/field.jpg'

export default function Home() {
  return (
    <div className='bg'>
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to Gameday Gold!</h1>
          <p>Your premier destination for all things sports betting.</p>
        </header>
        <section className="faq-section">
          <h2><strong>Frequently Asked Questions</strong></h2>
          <div className="faq-item">
            <strong>
            <h3>What's a spread?</h3>
            </strong>
            <p><strong>
              A spread is a range set by oddsmakers to provide an advantage or disadvantage based on the margin of victory or defeat for a given team. The "favorite" team (labeled with a "-" sign) would be at the disadvantage as they would need to win the game by a set number of points while the "underdog" team (labeled with a "+" sign) would be given an advantage to not lose the game by a set number of points.
              </strong>
            </p>
          </div>
          <div className="faq-item">
            <h3>What's the over/under?</h3>
            <p>
              <strong>
              The over/under or total is the number set by sportsbooks that estimates the total number of points scored by both teams combined. Bettors can then wager on whether they believe the teams will score more or less points than the total.
              </strong>
            </p>
          </div>
          <div className="faq-item">
            <h3>What are moneyline bets?</h3>
            <p>
              <strong>A moneyline bet is simply betting on which team you expect to win regardless of the margin of victory. The team perceived to be likelier to win will be labeled as the favorite and will have shorter odds, while the underdog will have longer odds and will pay out more if they win.
              </strong>
            </p>
          </div>
        </section>
      </div>
    </div> 
  )
}
