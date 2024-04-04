import { CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface Props {
  firstWord: string;
  secondWord: string;
}

export const Breadcrumbs = ({ firstWord, secondWord }: Props) => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center space-x-2">
        <Link to={`/${firstWord.toLowerCase()}`}>
          <p className="hover:underline">{firstWord}</p>
        </Link>
        <CaretRight size={20} className="text-ch-dark dark:text-ch-light" />
        <p>{secondWord}</p>
      </div>
    </div>
  );
};
