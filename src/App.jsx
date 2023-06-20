import React from 'react';
import { useState } from 'react';

import './App.css';

function App() {

  const [cardList, setCardList] = useState([
   {id: 1, order: 3, text: 'КАРТОЧКА 3'},
   {id: 2, order: 1, text: 'КАРТОЧКА 1'},
   {id: 3, order: 2, text: 'КАРТОЧКА 2'},
   {id: 4, order: 4, text: 'КАРТОЧКА 4'},
  ]) 

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
      setCurrentCard(card);
  }
  function dragLeaveHandler(e){

 }
  function dragEndHandler(e) {
   e.target.style.background = 'white'
  }

 function dragOverHandler(e) {
   e.preventDefault()
   e.target.style.background = 'lightgray'
 }

 function dropHandler(e, card) {
    e.preventDefault();
    setCardList(cardList.map(c => {
      if(c.id === card.id) {
         return {...c, order:currentCard.order}
      }
      if(currentCard.id === c.id) {
         return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = 'white';
 }
//*функция сортировки
 const sortCards = (a, b) => {
   if(a.order > b.order) {
      return 1
   } else {
      return -1
   }
 }

  return (
    <div className="app">
        {cardList.sort(sortCards).map(card => 
         <div 
            draggable={true}
            className={'card'} key={card.id}
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, card)}
         
         >
            {card.text}
         </div>
         )}
    </div>
  );
}

export default App;
