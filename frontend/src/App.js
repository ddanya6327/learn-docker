import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post(`/api/value`, { value: value }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("input filed");
      }
    });
  };

  useEffect(() => {
    // get data
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => <li key={index}>list.value</li>)}
          <br />

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Memo"
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">Add Memo</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
