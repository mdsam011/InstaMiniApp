import Stories from "./Stories"
import '../assets/StorySpace.css'
import { useContext } from "react"
import { userVar, ViewStoryFnc } from "../App";


const StorySpace = () => {

    var storycard = document.querySelector("#storycard")
    var prog = document.querySelector("#progress")

    var users = useContext(userVar)
    var ViewStory = useContext(ViewStoryFnc)

    return (
        <>
            <div id="storyspace" className='w-full h-[18%] px-4 border-b-[2px] gap-3  flex  items-center  overflow-x-scroll border-gray-300  ' onClick={(e) => ViewStory(e, prog, storycard)}>
            {   users.map((elem) => (
                    <Stories  key={elem.id} elem = {elem} />
                ))
            }
            </div>
        </>
    )
}

export default StorySpace
