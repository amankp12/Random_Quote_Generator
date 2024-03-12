import { useState, useEffect } from "react";
import './App.css';
import axios from  'axios';

function App(){
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [btnClick, setBtnClick] = useState(0);
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    axios.get("https://api.quotable.io/random")
      .then((data) => {
        setQuote(data.data.content);
        setAuthor(data.data.author);
  })
}, [btnClick])

const handleSave = () => {
  setSavedQuotes([...savedQuotes, {quote, author}]);
}
const handleDelete = (index) => {
  const newSavedQuotes = [...savedQuotes];
  newSavedQuotes.splice(index, 1);
  setSavedQuotes(newSavedQuotes);
}

// function updateQuote(){
//   setInterval(() => {
//   setBtnClick(btnClick+1)
// },5000)
// }
// updateQuote();

return (
  <div className="container">
    <h1>Random Quote Generator</h1>
      <div className="quatation"></div>
        <blockquote>{quote}</blockquote>
        <cite>-{author}</cite>
        <br />
        <button onClick={() => setBtnClick(btnClick+1)}>Next Quote</button>
        <button onClick={handleSave}>Save</button>

        <div className="saved-quotes">
          <h2>Saved Quotes</h2>
            <ul>
              {savedQuotes.map((savedQuote, index) => (
                <li key={index} className="saved-quote">
                  <blockquote>{savedQuote.quote}</blockquote>
                  <cite>-{savedQuote.author}</cite>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
        </div>
  </div>
)
}

export default App