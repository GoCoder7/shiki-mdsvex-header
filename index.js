import { h } from "hastscript";

export function addHeader(options = {}) {
  const headerClass = options.headerClass ?? "header";
  const headerToBottom = options.headerToBottom ?? false;
  const langCase = options.langCase ?? "cap"; // up, cap, none
  const langClass = options.langClass ?? "lang";
  const langFirst = options.titleFirst ?? false;
  const langVisible = options.langVisible ?? true;
  const titleCase = options.titleCase; // up, low, cap, none
  const titleClass = options.titleClass ?? "title";
  const titleVisible = options.titleVisible ?? true;
  return {
    pre(node) {
      // 1. lang(origin)
      let lang = node.properties.lang;
      let title;
      // 2. meta
      let meta = node.properties.meta;
      if (meta) {
        try {
          meta = JSON.parse(meta); // json형식인경우 파싱
        } catch (e) {
          meta = { title: meta };
        }
        // 3. title
        title = meta.title || "";
        // 4. lang(override)
        if (meta.lang) {
          lang = meta.lang;
        }
      }
      // 5. titleCase
      if (title) {
        switch (titleCase) {
          case "up":
            title = title.toUpperCase();
            break;
          case "low":
            title = title.toLowerCase();
            break;
          case "cap":
            title = title.capitalize();
            break;
        }
      }
      // 6. langCase
      if (lang) {
        switch (langCase) {
          case "up":
            lang = lang.toUpperCase();
            break;
          case "cap":
            lang = lang.charAt(0).toUpperCase() + lang.slice(1);
            break;
        }
      }

      // 7. define header children
      let header;
      let headerChildren = [];

      let langEl;
      if (langVisible && lang) {
        langEl = h("span", { class: langClass }, lang);
        headerChildren.push(langEl);
      }
      let titleEl;
      if (titleVisible && title) {
        titleEl = h("span", { class: titleClass }, title);
        if (langFirst) {
          headerChildren.push(titleEl);
        } else {
          headerChildren.unshift(titleEl);
        }
      }

      // 8. define header
      if (headerChildren.length !== 0) {
        header = h("div", { class: headerClass }, headerChildren);
      }

      // 9. add header
      if (header) {
        if (headerToBottom) {
          node.children.push(header);
        } else {
          node.children.unshift(header);
        }
      }
    },
  };
}
