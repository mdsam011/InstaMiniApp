import { AiFillCloseSquare } from "react-icons/ai";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { fadeOutStoryFnc, nextidxvar, pvar, Timerfnc, tmvar, userVar } from "../App";
import { useContext, useRef, useState } from "react";

const StoryCard = () => {

  let [changeImg,setChangeImg] = useState("")

  var fadeOutStory = useContext(fadeOutStoryFnc)
  var Timer =  useContext(Timerfnc)
  var p = useContext(pvar)
  var tm = useContext(tmvar)
  var nextidxarr = useContext(nextidxvar)
  var users = useContext(userVar)

  var prog = document.querySelector("#progress")
  // var storyspace = document.querySelector("#c")
  console.log(nextidxarr)

  var [nextidx, setNextidx] = nextidxarr
  const storyCardRef = useRef('')


  //  Function that closes the storycard and kills the profress aniamtions and clears all the timers
  var CloseStorySpace = () => {
    p.kill()
    clearTimeout(tm)
    prog.style.width = 0 + "%"
    storyCardRef.current.children[1].style.transform = "scale(0)"
    setTimeout(() => {
      storyCardRef.current.children[1].style.transform = "none"
      fadeOutStory(storyCardRef.current)
    }, 100)
  }

  // this function handles the Next images indexes
  var NextStory = () => {
    setNextidx(nextidx +=  1)
    if (nextidx >= users.length)
      setNextidx(nextidx = 0); // Reset the index to the first story
    // Display the next story
    showStory(nextidx);
  }

  // this function handles the previous images indexes
  var PrevStory = () => {
    setNextidx(nextidx-=1)
    if(nextidx < 0 )
      setNextidx(nextidx= users.length-1) // Resert to the last Story if exeeds 0 
    showStory(nextidx)
  }

  //  this function set the background on the basis of the index given by clicking the next and the previous button inside the storycard component and Refreshes the Timer and Progress animation
  var showStory = (index) => {
    console.log("new index : ", index)
    p.kill()
    clearTimeout(tm)
    prog.style.width = "0%";
    console.log(users[index].dp)
    setChangeImg(changeImg = users[index].dp)
    console.log("new Link ",changeImg)
    storyCardRef.current.style.backgroundImage = `url(${changeImg})`
    Timer(prog)
  }

  return (
    <div ref={storyCardRef} id="storycard" className="w-[36%] h-[91%] bg-slate-500 absolute hidden opacity-0 rounded-lg  z-30 overflow-hidden bg-cover bg-no-repeat bg-center">
      <div id="progress" className="w-0 absolute top-[4px] h-[3px] bg-white"></div>
      <AiFillCloseSquare onClick={CloseStorySpace} id="cross" className=" right-2 absolute size-8 text-white top-4" />
      <BsArrowRightSquareFill onClick={NextStory} id="next" className="size-8 text-white absolute top-1/2  right-2" />
      <BsArrowLeftSquareFill onClick={PrevStory} id="prev" className="size-8 text-white absolute top-1/2  left-2" />
      <IoHeartOutline className="text-white size-8 absolute bottom-4 right-2 " />
    </div>
  )
}

export default StoryCard
