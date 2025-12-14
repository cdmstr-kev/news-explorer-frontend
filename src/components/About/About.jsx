import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import "./About.css";
import authorAvatar from "../../assets/author-avatar.jpg";

const About = () => {
  return (
    <div className="about" aria-labelledby="about-heading">
      <section className="about__author">
        <img
          className={"about__author-avatar"}
          src={authorAvatar}
          alt={"Portrait of web developer"}
        />
        <div className="about__author-info">
          <h2 className="about__author-title">About the author</h2>
          <p className="about__author-desc">
            I'm Kevin, a frontend developer passionate about building things
            that matter. I work primarily with React and JavaScript, focusing on
            creating web applications that are both beautiful and functional.
            Good code should be invisible to users but obvious to other
            developers.
          </p>
          <p className="about__author-desc">
            My journey through TripleTen's Web Development Bootcamp transformed
            how I think about building for the web. Now I'm looking for
            opportunities to create impactful digital experiences. If you're
            building something meaningful, I'd love to hear about it.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;
