import NavBar from "./NavBar"
import PostSpace from "./PostSpace"
import StoryCard from "./StoryCard"
import StorySpace from "./StorySpace"
import "../assets/Card.css"

// eslint-disable-next-line react/prop-types
const Card = ({ cardContainer }) => {
    return (
        <>
            <div id="card" ref={cardContainer} className="w-[36%] h-[91%] bg-white rounded-2xl  overflow-hidden">
                <StoryCard></StoryCard>
                <NavBar />
                <StorySpace />
                <PostSpace />
            </div>
        </>
    )
}

export default Card
