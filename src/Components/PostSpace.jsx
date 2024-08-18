
import { useContext } from 'react'
import { userVar } from '../App'
import '../assets/Post.css'
import Post from './Post'


const PostSpace = () => {

    let users = useContext(userVar)

    return (

        <div id="PostSpace" className='h-[70%] w-[100%] flex flex-col  items-center gap-4 overflow-y-scroll '>
            {
                users.map((elem)=>(

                    <Post key={elem.id} elem={elem}/>
                ))
            }
        </div>
    )
}

export default PostSpace
