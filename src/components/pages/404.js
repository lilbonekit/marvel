import { Helmet } from "react-helmet";
import ErrorMessage from "../error-message/error-message"
import { Link } from "react-router-dom"

const Page404 = () => {
    return(
        <div>
             <Helmet>    
                <meta
                    name="description"
                    content="Page 404 Not founded"/>
                <title>Page 404 Not founded</title>
            </Helmet>
            <ErrorMessage/>
            <div style={
                    {
                        textAlign : 'center',
                        marginTop : '30px'
                    }
                }>
                <span style={
                    {
                        fontSize : '60px',
                    }
                }>404</span>
                <p>Page doesn't exist</p>
            </div>
            <Link style={
                    {
                        display : 'block',
                        margin : '15px auto 0 auto',
                        textAlign : 'center'
                    }
                } to="/" >
                <button
                  className="button button__main button__long">
                    <div className="inner">Back to main page</div>
                  </button>
            </Link>
        </div>
    )
}

export default Page404