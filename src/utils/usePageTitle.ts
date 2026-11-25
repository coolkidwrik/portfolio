import { useEffect } from "react";

// Sets the browser-tab title for each page, e.g. "Projects | Wrik Steven Sen".
// This helps people with many tabs open, and Google (which runs JavaScript)
// uses it in search results. Link previewers that don't run JavaScript still
// see the title in index.html.
const SITE_NAME = "Wrik Steven Sen";
const DEFAULT_TITLE = `${SITE_NAME} | Software Engineer`;

export const usePageTitle = (pageTitle?: string) => {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE_NAME}` : DEFAULT_TITLE;
  }, [pageTitle]);
};
