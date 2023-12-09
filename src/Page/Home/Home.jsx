import Banner from "../../Component/Banner/Banner";
import DifferentSection from "../../Component/DifferentSection/DifferentSection";
import FAQ from "../../Component/FAQ";
import FeaturedSurvey from "../../Component/FeaturedSurvey/FeaturedSurvey";
import HowItWork from "../../Component/HowItWork";
import RecentSurvey from "../../Component/RecentSurvey/RecentSurvey";
import Testimonial from "../../Component/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSurvey></FeaturedSurvey>
            <RecentSurvey></RecentSurvey>
            <HowItWork></HowItWork>
            <DifferentSection></DifferentSection>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;