import react from "react";
import styles from "@styles/components/category.module.css";
import { type Post } from "contentlayer/generated";

const CategoryPage = ({ categoryPosts }: { categoryPosts: Post[] }) => {
  const showPageNum = 5;
  const maxPageNum = Math.ceil(categoryPosts.length / showPageNum);
  const [page, setPage] = react.useState(1);
  const [showPost, setShowPost] = react.useState(
    categoryPosts.slice(0, showPageNum)
  );

  react.useEffect(() => {
    setShowPost(
      categoryPosts.slice(
        showPageNum * (page - 1),
        showPageNum * (page - 1) + showPageNum
      )
    );
  }, [page]);

  return (
    <div>
      {showPost.map((post) => (
        <div key={post._id} className={styles.postCard}>
          <a href={`/${post._raw.flattenedPath}`} className={styles.postText}>
            <h1 className={styles.postTitle}>{post.title}</h1>

            {post.summary && (
              <p className={styles.postSummary}>{post.summary}</p>
            )}
          </a>

          <div className={styles.tagList}>
            {post.tag &&
              post.tag.map((tag) => (
                <p key={tag} className={styles.tagItem}>
                  {tag}
                </p>
              ))}
          </div>
        </div>
      ))}

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.prevNextButton} ${
            page == 1 && styles.disabledButton
          }`}
          onClick={() => {
            if (page - 1 > 0) setPage(page - 1);
          }}
        >
          {"<"}
        </button>
        {Array(maxPageNum)
          .fill(0)
          .map((_, idx) => (
            <button
              className={`${styles.pageButton} ${
                idx + 1 == page && styles.selectedButton
              }`}
              key={idx + 1}
              onClick={() => {
                setPage(idx + 1);
              }}
            >
              {idx + 1}
            </button>
          ))}
        <button
          className={`${styles.prevNextButton} ${
            page == maxPageNum && styles.disabledButton
          }`}
          onClick={() => {
            if (page + 1 <= maxPageNum) setPage(page + 1);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
