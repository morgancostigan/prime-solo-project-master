import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h2>Technologies Used</h2>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>Redux-Saga</li>
        <li>Material-UI</li>
        <li>PostgreSQL</li>
        <li>Express</li>
        <li>Node</li>

      </ul>
    </div>
  </div>
);

export default AboutPage;
