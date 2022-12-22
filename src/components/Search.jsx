import React from 'react';
import Card from './Card';

export default function Search(props) {
  const { card, img, id, addCards, removeCards } = props;

  const [load, setLoad] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [search, setSearch] = React.useState({});

  async function apiCall(cardName) {
    const scryfall = `https://api.scryfall.com/cards/search?q=${cardName}`;
    setLoad(false);
    try {

      const res = await fetch(
        // `https://api.magicthegathering.io/v1/cards?name=${cardName}`
        scryfall
      );
      const data = await res.json();
      setSearch(data);
      setLoad(true);
    } catch(error){
      console.log(error)
    }
  }

  function handleKeyPress(e){
    // stop code if any key that is not enter
    if (e.key !=='Enter'){
      return
    }
    apiCall(userInput)
    setUserInput('')
  }

  function handleClick() {
    apiCall(userInput);
  }

  return (
    <div>
      <h2>Enter a Magic Card!</h2>

      <input
        type="text"
        value={userInput}
        onKeyDown={handleKeyPress}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={() => handleClick(userInput)}>Search</button>
      <div className="cards-container">
        {/* if load is true then map through the array and return a card for each item */}
        {load &&
          search.data.map((item, index) => {
            // some of the items did not have the image_uri object so you need to check and filter them out!
            if (item.hasOwnProperty('image_uris')) {
              console.log(item.prices.usd);
              return (
                // return props for the Card component
                <Card
                  card={item}
                  name={item.name}
                  img={item.image_uris.normal}
                  id={item.id}
                  key={index + 1}
                  addCards={addCards}
                  removeCards={removeCards}
                  price={item.prices.usd}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
