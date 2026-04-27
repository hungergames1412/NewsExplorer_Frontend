import "./About.css";
import aboutProfile from "../../assets/about-profile.jpg";
const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__image" src={aboutProfile} alt="jmik" />
        <div className="about__info">
          <h2 className="about__info-title">About the author</h2>
          <p className="about__info-text">
            Hello! My name is Susan Hofmann. I'm a Software Engineering student at
            TripleTen, and a process engineering technician in the automotive industry. I also love to sew and craft items and i use the same creative drive to create web designs
          </p>
            <span className="about__hightlight">
              Welcome to my NewsExplorer app
            </span>
        </div>
      </div>
    </section>
  );
};

export default About;