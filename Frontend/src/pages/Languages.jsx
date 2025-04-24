import { useParams } from "react-router-dom";
import { Languages } from "../data/languages.js";

export default function LanguageDetail({ languages }) {
  const { slug } = useParams();
  const language = Languages.find((lang) => lang.slug === slug);

  if (!language) {
    return <div className="p-5 text-richblack-50">Language not found!</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col ">
      <h1 className="text-4xl font-bold mb-4 text-richblack-50 text-center ">
        {language.language}
      </h1>
      <div className="flex justify-center mb-4">
        <img
          src={language.logo}
          alt={`${language.language} logo`}
          className="w-24 h-24 object-contain"
        />
      </div>
      <p className="text-richblack-200 mb-2">{language.description}</p>
      <p className="text-richblack-300">Year Created: {language.yearCreated}</p>
    </div>
  );
}