// TASK:
// POST /jokes: For adding new jokes.
// GET /jokes: For fetching all jokes.
// PUT /jokes/:id: For editing a joke by its ID. 
// DELETE /jokes/:id: For deleting a joke by its ID. (NO BODY)

// export const placeOrder= async()=>{
//     const postOptions = {
//         method: "POST",
//         headers: {"Content-Type": "application/json"
//     },body: JSON.stringify(transientState) //stringify the object transientState 
// }
//   // Send the transient state to your API
// const response = await fetch ("http://localhost:8088/orders", postOptions) //rmbr async in fn declaration

//Task: Create a jokeService module (e.g., services/jokeService.js) with a function for posting a new joke:
export const postNewJoke= async(jokeObject)=>{ //jokeObject is new object with text that you want to send to API
        const postOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"
        },body: JSON.stringify(jokeObject) //stringify the object jokeObject 
    }
      // Send the joke to your API
    const response = await fetch (`http://localhost:8088/jokes`, postOptions)
   // return await response.json()--optional
}

export const getAllJokes=()=>{
    return fetch(`http://localhost:8088/jokes
    `).then((res)=>res.json())//get a response, make it readable
}

//Chapter4:The Post
//add and export a new function from jokeService.jsx to return a fetch call with the PUT method. This function should accept the edited joke object as a parameter.
export const editedJoke=async(editedJokeObject)=>{ 
    const putOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"
    },body: JSON.stringify(editedJokeObject) 
}
  // Send to API
  //Need /${editedJokeObject.id} extension for PUT method so server know which specific joke in the database to edit
const response = await fetch (`http://localhost:8088/jokes/${editedJokeObject.id}`,putOptions) //backticks (`)for string interpolation with ${}!!!

}

export const deleteJoke=async(jokeId)=>{ 
    const deleteOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"
    },//body: JSON.stringify(jokeId) --NO DELETE METHOD NO BODY
}
  // Send to API
  //Need /${editedJokeObject.id} extension for PUT method so server know which specific joke in the database to edit
const response = await fetch (`http://localhost:8088/jokes/${jokeId}`,deleteOptions) 

}

export const moveToToldJoke = async (jokeId) => {
    const joke = await fetch(`http://localhost:8088/jokes/${jokeId}`).then(res => res.json()); // Fetch the joke data
    const updatedJoke = { ...joke, told: true }; // Update the 'told' property to true while preserving other properties
    //{ ...joke }: This creates a new object with all the properties of the joke object.
//told: true: This overrides the told property of the new object with true.
    const putOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJoke),
    };
    // Move the joke to the "told" category in the server
    await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions);
  };
  
  export const moveToUntoldJoke = async (jokeId) => {
    const joke = await fetch(`http://localhost:8088/jokes/${jokeId}`).then(res => res.json()); // Fetch the joke data
    const updatedJoke = { ...joke, told: false }; // Update the 'told' property to true while preserving other properties
    //{ ...joke }: This creates a new object with all the properties of the joke object.
//told: true: This overrides the told property of the new object with true.
    const putOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJoke),
    };
    // Move the joke to the "told" category in the server
    await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions);
  };
  











