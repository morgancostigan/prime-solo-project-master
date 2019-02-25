import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'



const AboutPage = () => (
  <div>
    <div>
      <h2>Welcome to What's Brewin'</h2>
      <p>What's Brewin' was designed to help brewers connect more directly with the craft beer drinking community, by giving them an uninterupted platform to showcase their upcoming beers and keep track of their current portfolio, and hopefully reach some new customers.</p>
      <p>What's Brewin' gives customers the opportunity to explore and discover new beers and new breweries. Each user has a calendar that they can easily save beer releases to, they can follow breweries, and search by release date, brewery or style.</p>

      <h2>Technologies Used</h2>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>Redux-Saga</li>
        <li>Material-UI</li>
        <li>PostgreSQL</li>
        <li>Express</li>
        <li>NodeJs</li>
      </ul>
      <h2>Thanks a Million</h2>
      <p>Dane, Dev, and Ally.  Vega cohort and the rest of Prime students and staff.</p>
      <h2>Future Features</h2>
      <p>In the future I hope to implement location filtering, comments, and sharing.</p>
    </div>
  </div>
);

export default AboutPage;
