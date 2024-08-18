/* eslint-disable react/prop-types */
import { FiHeart } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { TiLocationArrowOutline } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";
import {  ViewStoryFnc } from "../App";
import { useContext } from "react"




const Post = ({ elem }) => {

    var storycard = document.querySelector("#storycard")
    var prog = document.querySelector("#progress")

    var ViewStory = useContext(ViewStoryFnc)

    return (
        <div id="post" className="w-4/5 h-[96%] flex flex-col  overflow-x-hidden rounded-[10px] my-2 shrink-0">

            <div id='info' className='w-full h-[16%] flex items-center justify-between px-3 py-1 border-b-[1px] border-zinc-300'>
                <div id='info1' onClick={(e)=>ViewStory(e,prog,storycard)} className='flex gap-2 items-center'>
                    <img id={elem.id} className='w-[55px] border-2 border-orange-700 h-[55px] rounded-full object-cover shrink-0' src={`${elem.dp}`} alt="" />
                    <div className='shrink-0 flex flex-col  justify-center h-full'>
                        <h4 className="text-2xl font-semibold ">{elem.usename}</h4>
                        <h5 className="text-sm">{elem.music}</h5>
                    </div>
                </div>
                <div id='info2'>
                    <HiDotsVertical className="text-3xl" />
                </div>
            </div>
            <img id={elem.id} src={`${elem.dp}`} className='w-full h-[68%] object-contain' alt="" />
            <div id='icons' className="flex border-t-[1px] border-zinc-300 w-full h-[16%] px-4 justify-between items-center">
                <div className="flex gap-2">
                    <FiHeart className="text-3xl" />
                    <FaRegComment className="text-3xl" />
                    <TiLocationArrowOutline className="text-3xl" />
                </div>
                <FaRegBookmark className="text-3xl" />
            </div>

        </div>

    )
}

export default Post
