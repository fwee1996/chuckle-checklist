import "./App.css"
import { useEffect, useState } from "react"
import { deleteJoke, editedJoke, getAllJokes, moveToToldJoke, moveToUntoldJoke, postNewJoke } from "./services/jokeService"

export const App = () => {
  const [newJoke, setNewJoke] = useState("") //initialize state to store the user's input; 
  //empty string "" to store user input

  //Chapter3--list untold vs told and count
  const [allJokes, setAllJokes] = useState([]) //empty array!! to store all jokes!
  const [untoldJokes, setUntoldJokes] = useState([]) 
  const [toldJokes, setToldJokes] = useState([])
//fetch local
//jokes=res

//NO:
// useEffect(()=>{ //only run on initial render
//   getAllJokes().then((jokesArray)=>{//get all jokes then set all jokes 
//and pass in array "jokesArray"
//     setAllJokes(jokesArray) //set function trigger rerender! 
//runs getAllJokes and set all --infinite loop
//     console.log("jokes set!")
//   } )
// },[])

// Fetch jokes!!!! on initial render
useEffect(() => { 
    //const fetchJokes = async () => {------------
    //const jokesArray = await getAllJokes() // Fetch all jokes from the API------------
    //setAllJokes(jokesArray) // Store jokes in state\------------
    getAllJokes().then((jokesArray) => { //these two lines of code replace ---------simplify fetching and setting jokes. 
      setAllJokes(jokesArray)

      //explanation for above used in useEffect initially to get all jokes and in all handle functions:
      //Fetch data: getAllJokes() gets all jokes from API
      // Handle Result: .then method is called with the array of jokes
      //Update State: setAllJokes(jokeArr) updates the component's state with the new array of jokes, 
      //which triggers a re-render to display the updated list of jokes

    console.log("jokes set!")
  })
  //fetchJokes()------------
}, []) // Empty dependency array ensures this runs only once on initial render

//NO:
  // useEffect(()=>{
  //   if (toldJokes){
  //     //showUntoldJokesOnly(true)
  //     const toldJokes = allJokes.filter(
  //       (joke)=> joke.told===true
  //     )
  //     setFilteredJokes(toldJokes) //now we have allJokes and filteredJokes which is an 
  //at first an empty array that will populate with filtered jokes
  //   }else{
  //     setFilteredJokes(untoldJokes)//if you press show all filtered jokes will populate with all jokes
  //   }
  // },[showToldJokesOnly, allJokes])

  // Update told and untold jokes when allJokes changes
  useEffect(() => {
    const told = allJokes.filter(joke => joke.told) // Filter jokes that are told
    const untold = allJokes.filter(joke => !joke.told) // Filter jokes that are untold
    setToldJokes(told) // Update state with told jokes
    setUntoldJokes(untold) // Update state with untold jokes
  }, [allJokes]) // Dependency array with allJokes ensures this runs when allJokes changes



  // This function handles the addition of a new joke.
  const handleAddJoke= async ()=>{
    // Create a joke object with the text from the newJoke state and set the told property to false.
  const joke ={
    text: newJoke,
    told: false,
  }
  // Call the postNewJoke function to send the joke object to the API.
  await postNewJoke(joke)
  setNewJoke("")//clear input field!! by resetting the newJoke state to an empty string.\

  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
  }



  // This function handles edited joke.
  //(joke) parameter has joke's ID and current text, tells which joke is being edited. 
  //if () left blank--undefined bcs fn wont know which joke/info to send to API
  const handleEditedJoke= async (joke)=>{ 
  // Call the editedJoke function to send the joke object to the API.
  // the passed joke object in fn call contains all necessary info. 
  //This object is retrieved from the component's state

  // NO: await editedJoke(joke), instead:
  await editedJoke(joke)
  .then(() => {
      // If the API call is successful, update the state with the new joke list
      getAllJokes().then((jokesArray) => {
          setAllJokes(jokesArray);
      });
  })

  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
  }



 // This function handles delete joke.
 const handleDeleteJoke= async (jokeId)=>{ 
  await deleteJoke(jokeId)
  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
}


const handleMoveToTold= async (jokeId)=>{ 
  await moveToToldJoke(jokeId)
  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
}

const handleMoveToUntold= async (jokeId)=>{ 
  await moveToUntoldJoke(jokeId)
  getAllJokes().then((jokesArray) => {
    setAllJokes(jokesArray)
  })
}

  return (
  <div className="app-container">

    <div className="app-heading">
    <h1 className="app-heading-text">Chuckle Checklist</h1>
    </div>

    <h2>Add Joke</h2>

    <div className="joke-add-form">
    <input   // This input field is tied to the newJoke state.
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        // What's the value of event?
        value={newJoke}// Set input field value to newJoke state so it reflects the current state.
        onChange={(event) => {
    // Update the newJoke state with the value typed by the user.
    setNewJoke(event.target.value)
    console.log(onChange)//Log the event to see the user's input
// The button below triggers the handleAddJoke function when clicked.
        }}
      />

      {/**onClick={handleAddJoke} don't need argument vs onClick={() => handleDeleteJoke(joke.id)} 
       * note: if you have empty onCLick button will appear "placeholder" but no fn performed when button is clicked
      */}
    <button className="joke-input-submit" onClick={handleAddJoke}>Add</button>  
    </div>

<div className="joke-lists-container">
<div className="joke-list-container">
    <h2><i className="fa-regular fa-face-meh" /> Untold Jokes <span className="untold-count ">  {untoldJokes.length}</span></h2> 
    {/* Display count of untold jokes -- untoldJokes is array declared initially line 10*/}
    <article className="jokes">
    {untoldJokes.map(joke=>(
        <li className="joke-list-item" key={joke.id}>
        {/* <header className="joke-info">#{joke.id}</header> */}
        <div className="joke-list-item-text">{joke.text}</div>
        {/* <button className="joke-edit-submit" onClick={() => handleEditedJoke(joke)}>Edit</button> */}
        <button className="joke-list-action-delete" onClick={() => handleDeleteJoke(joke.id)}><i className="fa-regular fa-trash-can"  /></button>
        <button className="joke-list-action-toggle" onClick={()=> handleMoveToTold(joke.id)} ><i className="fa-regular fa-face-laugh-squint"/></button>

        </li>
    ))}
        </article>
</div>     

<div className="joke-list-container">
<h2><i className="fa-regular fa-face-laugh-squint" /> Told Jokes<span className="told-count "> {toldJokes.length}</span></h2> 
{/* Display count of told jokes -- toldJokes is array declared initially line 10*/}
    <article className="jokes">
    {toldJokes.map(joke=>(
        <li className="joke-list-item" key={joke.id}>
          {/* optional number tracker: <header className="joke-info">#{joke.id}</header> */}
        <div className="joke-list-item-text">{joke.text}</div>
        {/**onClick={handleEditedJoke} requires handleEditedJoke to get info which joke to edit from somewhere other than the parameter list
        * onClick={() => handleEditedJoke(joke)} --function called with specific joke object when the button is clicked.*/}
        {/* optional edit: <button className="joke-edit-submit" onClick={() => handleEditedJoke(joke)}>Edit</button> */}
        <button className="joke-list-action-delete" onClick={() => handleDeleteJoke(joke.id)}><i className="fa-regular fa-trash-can"  /></button>
        <button className="joke-list-action-toggle" onClick={()=> handleMoveToUntold(joke.id)}><i className="fa-regular fa-face-meh" /></button>
        </li>
    ))}
      </article>
      </div>
      </div>
    </div>
      )

   }




