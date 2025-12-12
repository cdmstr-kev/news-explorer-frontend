import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import "./About.css";

const About = () => {
  return (
    <div className="about" aria-labelledby="about-heading">
      <section className="author">
        <img
          className={"author__avatar"}
          src={avatarPlaceholder}
          alt={"Portrait of web developer"}
        />
        <div className="author__info">
          <h2 className="author__title">About the author</h2>
          <p className="author__desc">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="author__desc">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;
