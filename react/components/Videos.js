import React from 'react';

function Videos (props) {
  return (
    <div className="main">
      <div className="videos">
        <h3>Videos</h3>
        <ul>
          <li>
            <div>
              <a href="https://www.youtube.com/watch?v=etC6q0TMG9g">
                <img className="thumb" src="https://img.youtube.com/vi/etC6q0TMG9g/mqdefault.jpg" alt="Ben & Emeline"/>
              </a>
              <h5>Ben Morris & Emeline Rochefeuille</h5>
              <h6>West Coast Swing</h6>
              <p>This is what happens when the world's best, coming from far away places, join together over a unique, highly dope track.</p>
            </div>
          </li>

          <li>
            <div>
              <a href="https://www.youtube.com/watch?v=mLlUOymDa2U">
                <img src="https://img.youtube.com/vi/mLlUOymDa2U/mqdefault.jpg" alt="William & Paloma"/>
              </a>
              <h5>William & Paloma</h5>
              <h6>Brazilian Zouk</h6>
              <p>William & Paloma, partners from Brazil. Demoing for us in Seattle at our very own Salsa Con Todo in Fremont (The Center of The Universe).</p>
            </div>
          </li>

          <li>
            <div>
              <a href="https://www.youtube.com/watch?v=FRMpb1N01P4">
                <img src="https://img.youtube.com/vi/FRMpb1N01P4/mqdefault.jpg" alt=""/>
              </a>
              <h5>Natalya & Umario</h5>
              <h6>Roxanne - Ballroom Tango</h6>
              <p>Featuring local dancer Natalya Zrazhevskaya, a freestyle artist of staggering talent & devotion.</p>
            </div>
          </li>

          <li>
            <div>
              <a href="https://www.youtube.com/watch?v=iXOuzMZ8TtU">
                <img src="https://img.youtube.com/vi/iXOuzMZ8TtU/mqdefault.jpg" alt=""/>
              </a>
              <h5>Ricardo Vega & Karen Forcano</h5>
              <h6>Salsa World Championships</h6>
              <p>Sequins & Acrobatics, these World Champions from Argentina showcase the lighting fast spins of Salsa Cabaret.</p>
            </div>
          </li>

          <li>
            <div>
              <a href="https://www.youtube.com/watch?v=0CXKClVW7lo">
                <img src="https://img.youtube.com/vi/0CXKClVW7lo/mqdefault.jpg" alt=""/>
              </a>
              <h5>Koharu Sugawara</h5>
              <h6>Hip Hop Choreography</h6>
              <p>A personal fav, words don't do this justice!</p>
            </div>
          </li>        

        </ul>
        
      </div>
    </div>        
  );
}

export default Videos;
