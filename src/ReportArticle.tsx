import type { ReportContent } from "./types";

export function ReportArticle({ report }: { report: ReportContent }) {
  return (
    <article className="essay-column report-article" lang={report.lang ?? "en"}>
      <header>
        <h2>{report.title}</h2>
        <p className="report-subtitle">{report.subtitle}</p>
        {report.byline && <p className="report-byline">{report.byline}</p>}
      </header>
      <div className="essay-body">
        {report.blocks.map((block, index) => {
          if (block.kind === "heading")
            return <h3 key={index}>{block.text}</h3>;
          if (block.kind === "image")
            return (
              <figure key={block.src}>
                <img
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  loading="lazy"
                />
              </figure>
            );
          return (
            <p className="report-paragraph" key={index}>
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}
