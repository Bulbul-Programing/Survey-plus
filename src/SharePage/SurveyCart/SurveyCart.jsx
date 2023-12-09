import { Link } from "react-router-dom";

const SurveyCart = ({ data }) => {
    const { title,_id, shortDescription, image, totalVotes, categoryName, postDate } = data
    return (
        <div>
            <div className="card h-[500px] bg-base-100 shadow-xl">
                <figure><img className="h-[180px] w-full rounded-lg" src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>

                    <p className="font-medium">Total Vote: {totalVotes}</p>
                    <p className="font-medium">Date: {postDate}</p>
                    <p className="bg-slate-100 p-2 rounded-md text-center font-medium">{categoryName}</p>

                    <p>{shortDescription.slice(0, 60)} ......</p>
                    <div className="card-actions justify-center">
                        <Link to={`/surveyDetails/${_id}`}><button className="btn font-bold bg-blue-500 text-white hover:text-black">Show Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyCart;