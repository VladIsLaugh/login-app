import React from 'react';
// import Main from './components/Main/Main'
import Main from './containers/Main/Main'

// const Main = React.lazy(()=>import('./containers/Main/Main') )
function App() {
  return (
    <div className="App">
      {/* <React.Suspense fallback={<div>loading... </div>}> */}
        <Main />
      {/* </React.Suspense> */}
    </div>
  );
}

export default App;
