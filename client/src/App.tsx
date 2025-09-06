import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes> */}
        <Route path="/">
          <p>Hellow</p>
        </Route>
        {/* </Routes> */}

        {/* <Container /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
