import React, { useEffect, useState } from 'react';
import wordList from "./resources/words.json"



const MAX_TYPED_KEYS = 30;

const getWordFile = () =>{
  const index = Math.floor(Math.random()* wordList.length);
  const word = wordList[index];
  return word.toLowerCase();
}

const isValidKey = (key, word) =>{
  if(!word) return false;
  const result = word.split('').includes(key);
  return result;
}

const Word =({word,validKeys})  =>{
  if(!word) return null;
  const joinedKeys = validKeys.join('')
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);

  return (<>
    <span className="matched">{matched}</span>
    <span className="remainder">{remainder}</span> 
  </>)
}

const App = () => {

  //console.log('word', getWordFile());

  const [getTypedKeys, setTypedKeys] = useState([]);
  const [getValidKeys, setValidKeys] = useState([]);
  const [getcompletedWords, setcompletedWords] = useState([]);
  const [getWord, setWord] = useState('');

  useEffect(()=>{
    setWord(getWordFile());
  }, [])


  useEffect(()=>{
    const wordFromValidKeys =  getValidKeys.join("").toLowerCase();
    if (getWord && getWord === wordFromValidKeys){
      //adidcionar word ao ccompledwords
      //limpara o array do validkeys
      //buscar uma nova palavra
      //ccompledwords 

      let newWord = null;
      do{
        newWord = getWordFile();
      }while(getcompletedWords.includes(newWord))

      setWord(newWord);

      setValidKeys([]);
      setcompletedWords((prev)=>[...prev, getWord])



    }
  }, [getWord, getValidKeys, getcompletedWords])



  const handleKeyDown = (e) =>{
    e.preventDefault();
    const { key } = e;
    setTypedKeys((prevTypedKeys =>{
      return [...prevTypedKeys, key].slice(MAX_TYPED_KEYS*-1);
    }))

    if(isValidKey(key, getWord)){
      setValidKeys((prev)=>{
        const isValidLength = prev.length <= getWord.length;
        const isNextChar = isValidLength && getWord[prev.length] === key;

        console.log(prev, prev.length);
        console.log(getWord);
        console.log(isNextChar);


        return (isNextChar) ? [...prev, key] : prev;
      })
    }

    //console.log("key", key)
  }

  return (
  <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
    <div className="valid-keys">

      <Word word={getWord} validKeys={getValidKeys} />

      {
      //<span className="matched">tes</span>
      //<span className="remainder">te</span> 
      }

    </div>
    <div className="typed-keys">{getTypedKeys}</div>
    <div className="completed-words">
      <ol>
        {getcompletedWords.map((getWord)=>{
          return <li key={getWord} >{getWord}</li>
        })}
      </ol>
    </div>
  </div>
  )
}

export default App;
