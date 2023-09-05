import image from'./error.gif'

const ErrorMessage = () => {
    return (
        <>
         <img src={image} alt="Error 404"  style={
            {
            display: "block",
            width: 250,
            height: 250,
            margin: "0 auto",
            objectFit: "cover"
            }
            }/>
            {/* <p>Упс персонажа с таким id не найдено!</p> */}
        </>
    )
}

export default ErrorMessage