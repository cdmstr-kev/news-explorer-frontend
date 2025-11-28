import "./NewsCard.css";
import placeholder from "../../assets/placeholderimage.png";
import bookmark from "../../assets/bookmark.png";

const NewsCard = () => {
  return (
    <li className="card">
      <img className={"card__image"} src={placeholder} alt="card-image" />
      <div className="card__contents">
        <p className={"card__date"}>November 4, 2020</p>

        <h1 className={"card__title"}>
          Everyone Needs a Special 'Sit Spot' in Nature
        </h1>
        <p className={"card__description"}>
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className={"card__subtitle"}>TREEHUGGER</p>
        <img className={"card__bookmark"} src={bookmark} alt="bookmark-icon" />
      </div>
    </li>
  );
};
export default NewsCard;
