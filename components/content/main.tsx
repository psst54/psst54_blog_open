import styles from "@styles/components/content.module.css";
import { type Main } from "contentlayer/generated";
import {
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  FunctionComponent,
} from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { useMDXComponent } from "next-contentlayer/hooks";

const Aside = ({ children, ...props }: { children: ReactNode }) => {
  return <div className={styles.styledBox}>{children}</div>;
};
const Highlight = ({ children, ...props }: { children: ReactNode }) => {
  return <span className={styles.styledHighlight}>{children}</span>;
};

const MainPage = ({ mainPost }: { mainPost: Main }) => {
  const components = {
    h1: (props: any) => <h1 className={styles.styledH1} {...props} />,
    h2: (props: any) => <h2 className={styles.styledH2} {...props} />,
    h3: (props: any) => <h3 className={styles.styledH3} {...props} />,
    h4: (props: any) => <h4 className={styles.styledH3} {...props} />,
    h5: (props: any) => <h5 className={styles.styledH3} {...props} />,
    h6: (props: any) => <h6 className={styles.styledH3} {...props} />,
    p: (props: any) => <p className={styles.styledP} {...props} />,
    a: (props: any) => (
      <a target="_blank" className={styles.styledA} {...props} />
    ),
    li: (props: any) => <li className={styles.styledLi} {...props} />,
    ol: (props: any) => <ol className={styles.styledOl} {...props} />,
    ul: (props: any) => <ul className={styles.styledUl} {...props} />,
    blockquote: (props: any) => (
      <blockquote className={styles.styledBlockquote} {...props} />
    ),
    pre: (props: any) => <pre style={{ overflow: "auto" }} {...props} />,
    img: (props: any) => (
      <img
        src={props.src}
        alt={props.alt}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    ),
    code: (props: any) => {
      const match = /language-(\w+)/.exec(String(props.className));
      return match ? (
        <SyntaxHighlighter
          style={nord}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(props.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={styles.styledCode} {...props}>
          {props.children}
        </code>
      );
    },
    Aside,
    Highlight,
  };

  const MDXContent = useMDXComponent(mainPost.body.code);

  return <MDXContent components={components} />;
};

export default MainPage;
