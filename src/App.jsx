// import React from 'react'
import gsap from 'gsap'
import Card from './Components/Card'
import { createContext, useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import axios from 'axios'

// context to store our functins and variables that are provided to the other components for future use
let userVar = createContext()
let ViewStoryFnc = createContext()
let fadeOutStoryFnc = createContext()
let Timerfnc = createContext()
let pvar = createContext()
let tmvar = createContext()
let nextidxvar = createContext()


const App = () => {

  // users : stores the data coming from the get axios call to the api
  const [users, setdata] = useState([]);

  // p : stores the tween that animates the progress bar ,and can be used by other components to kill the amimation
  const [p, setP] = useState(null);

  // tm : stores the timeoutfunction which automatically kills the animation after a set time and restores the progress to its orignal lenght
  const [tm, setTm] = useState(null);

  // idx : is use to know which image is clicked by the user and is also used to go to next and previous image
  const [idx, setIdx] = useState(0);

  // is a ref to the the card component which is used by the Gsap scope ,it enables us to use gsap animations on any element
  const cardContainer = useRef("")

  //  using GSAP hook to appy animations and contextSafe make our Interactive Animation Posiible
  const { contextSafe } = useGSAP(() => {

  }, { scope: cardContainer })

  const RollAnimation =() => {
    
    gsap.from(".stories", {
      rotate: 360,
      duration: 1,
      x: 400,
      ease: "back(2)",
      stagger: 0.15,
    });
  }

  // this is a Asynchronous function that gets the data from a mock api through axios.get request and updates the user state
  const getdata = async () => {
    const response = await axios.get("https://66b429ba9f9169621ea1ece1.mockapi.io/InstaUsers")
    console.log(response)
    setdata(response.data)
    if (response.status == 200)
      RollAnimation()
  }




  // useEffect hook it will execute the getdata method on the very first render of our app
  useEffect(() => {
    getdata()

  }, [])





  //  this Function Fades the the StoryCard after whenever called
  const fadeOutStory = contextSafe(() => {
    gsap.to("#storycard", {
      opacity: 0,
      display: "none",
      duration: 0.1
    },)
  })

  // This timer Fucntion animates the Progress bar inside the storycard component for a certain anount of time
  // after that time this animations is killed and width of the progress bar is restored,then fadeOutStory is called to hide the storycard
  var Timer = contextSafe((prog) => {
    const animation = gsap.to(prog, {
      width: "100%",
      duration: 4.1
    });
    setP(animation); // Ensure setP is called with the correct value

    setTm(setTimeout(() => {
      // after setP() -  p is not updated instantly so it takes some time thats why it gives error when we use p.kill() instead of animate.kill()
      if (animation) { // Check if animation is not null before calling kill
        animation.kill();
      }
      console.log(prog);
      prog.style.width = "0%";
      fadeOutStory();
    }, 4100));
  });

  // its a callback function that is used by the event listner of the storyspace component
  //  to show the story based on the image clicked
  var ViewStory = contextSafe((e, prog, storycard) => {
    // console.log("Curent Index : ", e.target.id - 1)
    // get the index of the image on the basis of the id of the clicked elemet
    const eidx = e.target.id - 1
    // and stored to the idx state for further use
    setIdx(eidx)
    console.log("Current index from e.target.idx =  eidx :---> : " + eidx)
    console.log("Current index not updated  :---> : " + idx)
    // now with gsap storycard is made visible 
    gsap.to(storycard, {
      duration: 0.2,
      opacity: 1,
      display: "block",
    });
    console.log(users[e.target.id - 1].dp)
    // background image of the storcard is set to the image that is clicked
    storycard.style.backgroundImage = `url(${users[e.target.id - 1].dp})`;
    // and lastly timer function is called to start the progress bar animation and to close the storycard after certain time as all story are automatically closed
    Timer(prog)
  })


  return (
    <>
      {/* Component is wraped with the Context provider that can acces the variables defined under  value using useContext hook */}
      <userVar.Provider value={users}>
        <ViewStoryFnc.Provider value={ViewStory}>
          <fadeOutStoryFnc.Provider value={fadeOutStory}>
            <Timerfnc.Provider value={Timer}>
              <pvar.Provider value={p}>
                <tmvar.Provider value={tm}>
                  <nextidxvar.Provider value={[idx, setIdx]}>

                    <Card cardContainer={cardContainer} />

                  </nextidxvar.Provider>
                </tmvar.Provider>
              </pvar.Provider>
            </Timerfnc.Provider>
          </fadeOutStoryFnc.Provider>
        </ViewStoryFnc.Provider>
      </userVar.Provider>
    </>
  )
}

export default App
export { fadeOutStoryFnc, Timerfnc, pvar, tmvar, nextidxvar, userVar, ViewStoryFnc }
