/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types

const Stories = ({ elem }) => {
  return (
    <>
      <div className={`stories h-[80%] w-[85px] bg-blue-50  z-10 bg-cover shrink-0 overflow-hidden  rounded-[50%] border-2 border-orange-700`}>
        <img id={elem.id} src={`${elem.dp}`} alt="" />
      </div>

    </>
  )
}

export default Stories
