import { useState } from "react";
import type { PhotoAlbum } from "./types";

// Uses faithful whole-page image exports rather than an embedded PDF toolbar.
// The source PDF is never served or linked by this component.
export function AlbumViewer({ album }: { album: PhotoAlbum }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const ready =
    album.pages.length === album.expectedPageCount &&
    album.pages.every((page, i) => page.pageNumber === i + 1);
  const page = album.pages[index];
  const move = (next: number) => {
    setIndex(next);
    setZoomed(false);
    setFailed(false);
  };
  return (
    <section className="album-viewer" aria-label={album.title.en}>
      <h2>
        {album.title.en}
        <span className="zh" lang="zh-Hans">
          {album.title.zh}
        </span>
      </h2>
      {!ready ? (
        <p className="pending-material">
          The original album pages are awaiting a readable upload. The full
          album will appear here once all 17 pages can be checked.
          <span className="zh" lang="zh-Hans">
            原始相册页面待提供可读取的文件。全部17页核对后，将在此完整展示。
          </span>
        </p>
      ) : (
        <>
          <div className="album-controls">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => move(index - 1)}
            >
              ← Previous<span lang="zh-Hans">上一页</span>
            </button>
            <output aria-live="polite" aria-atomic="true">
              Page {index + 1} of {album.pages.length}
              <span lang="zh-Hans">
                第{index + 1}页 / 共{album.pages.length}页
              </span>
            </output>
            <button
              type="button"
              disabled={index === album.pages.length - 1}
              onClick={() => move(index + 1)}
            >
              Next →<span lang="zh-Hans">下一页</span>
            </button>
          </div>
          <div className="album-tools">
            <button
              type="button"
              aria-pressed={zoomed}
              onClick={() => setZoomed(!zoomed)}
            >
              {zoomed ? "Fit page / 适应页面" : "Read closer / 放大阅读"}
            </button>
          </div>
          <div
            className={`album-page ${zoomed ? "zoomed" : ""}`}
            tabIndex={0}
            role="region"
            aria-label="Album page; scroll to read when enlarged / 相册页面，放大后可滚动阅读"
            key={index}
          >
            {failed ? (
              <p role="alert">
                This page could not load. Please try another page or reload.
                <span className="zh" lang="zh-Hans">
                  此页未能加载，请尝试其他页面或刷新。
                </span>
              </p>
            ) : (
              <img
                src={page.src}
                alt={page.alt}
                width={page.width}
                height={page.height}
                onError={() => setFailed(true)}
              />
            )}
          </div>
          {page.permissionReviewRequired && (
            <p className="album-permission">
              Publication permission review needed: identifiable people appear
              on this page.
              <span className="zh" lang="zh-Hans">
                发布权限待审核：此页包含可识别的人物。
              </span>
            </p>
          )}
        </>
      )}
    </section>
  );
}
