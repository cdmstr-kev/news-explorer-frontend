import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import "./About.css";

const About = () => {
  return (
    <div className="about" aria-labelledby="about-heading">
      <section className="author">
        <img
          className={"author-img"}
          src={avatarPlaceholder}
          alt={"Portrait of web developer"}
        />
        <div className="author-info">
          <h2 className="author-title">About the author</h2>
          <p className="author-desc">
            This block describes the project author. Here you should indicate
            your
            <br />
            name, what you do, and which development technologies you know.
          </p>
          <p className="author-desc">
            You can also talk about your experience with TripleTen, what you
            learned
            <br />
            there, and how you can help potential customers.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;
