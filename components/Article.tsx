import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { articleType } from "@/types/ArticleType";

type Props = {
  article: articleType;
};

const Article: React.FC<Props> = ({ article }) => {
  return (
    <Card>
      <Link href={`/article/${article._id}`}>
        <div className="relative block h-56">
          <Image src={article.image} alt="" fill />
          <span className="absolute bottom-0 right-0 pr-3 pl-7 py-1 bg-primary rounded-tl-full text-gray-200">
            Comments: {article.comments}
          </span>
        </div>
        <div className="px-4 py-3">
          <p className="text-lg font-medium">{article.title}</p>
        </div>
      </Link>
    </Card>
  );
};

export default Article;
