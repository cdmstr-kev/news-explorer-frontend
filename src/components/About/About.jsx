import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import "./About.css";

const About = () => {
  return (
    <div className="about" aria-labelledby="about-heading">
      <section className="about__author">
        <img
          className={"about__author-avatar"}
          src={avatarPlaceholder}
          alt={"Portrait of web developer"}
        />
        <div className="about__author-info">
          <h2 className="about__author-title">About the author</h2>
          <p className="about__author-desc">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__author-desc">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;
