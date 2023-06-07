import styles from "@styles/components/content.module.css";
import { type Post, type Category } from "contentlayer/generated";
import { ReactNode } from "react";

const Content = ({
  posts,
  categories,
  children,
}: {
  posts: Post[];
  categories: Category[];
  children: ReactNode | undefined;
}) => {
  categories = categories.map((category) => {
    return {
      ...category,
      cnt: posts.filter((post) => post.category.includes(category.id)).length,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.sideContents}>
        <div className={styles.sidebar}>
          {categories.map(
            (category) =>
              category.subCategoryId && (
                <div key={category.title}>
                  <ul className={styles.categoryName}>
                    <a href={`/category/${category.id}`}>
                      {category.title}{" "}
                      <span className={styles.categoryCnt}>
                        ({category.cnt})
                      </span>
                    </a>
                  </ul>

                  {categories.map(
                    (subCategory) =>
                      category.subCategoryId &&
                      category.subCategoryId.includes(subCategory.id) && (
                        <ul
                          className={styles.subCategoryName}
                          key={subCategory.id}
                        >
                          <a href={`/category/${subCategory.id}`}>
                            {subCategory.title}{" "}
                            <span className={styles.categoryCnt}>
                              ({subCategory.cnt})
                            </span>
                          </a>
                        </ul>
                      )
                  )}
                </div>
              )
          )}
        </div>
      </div>

      <div className={styles.mainContents}>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default Content;
