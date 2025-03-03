import { h } from "hastscript";
import { HeaderInfo, HeaderOptions } from "./types.js";
import { capitalize } from "./functions.js";
import type { Element } from "hast";

export function addHeader(options?: HeaderOptions) {
  const headerClass = options?.headerClass ?? "header";
  const headerToBottom = options?.headerToBottom ?? false;
  const langCase = options?.langCase ?? "cap";
  const langClass = options?.langClass ?? "lang";
  const langFirst = options?.langFirst ?? false;
  const langVisible = options?.langVisible ?? true;
  const titleCase = options?.titleCase ?? "none";
  const titleClass = options?.titleClass ?? "title";
  const titleVisible = options?.titleVisible ?? true;

  return {
    pre(node: Element) {
      // 1. declare  variables
      let title: string | undefined;
      let lang = node.properties.lang as string | undefined;

      // 2. set title and lang
      let rawMeta = node.properties.meta as string | undefined;

      if (rawMeta) {
        let headerInfo: HeaderInfo;
        // 2-1. populate headerInfo
        try {
          headerInfo = JSON.parse(rawMeta);
        } catch (_) {
          headerInfo = { title: rawMeta };
        }
        // 2-2. set title
        title = headerInfo.title;
        // 2-3. override lang
        if (headerInfo.lang) {
          lang = headerInfo.lang;
        }
      }

      // 3. handle titleCase
      if (title) {
        switch (titleCase) {
          case "up":
            title = title.toUpperCase();
            break;
          case "low":
            title = title.toLowerCase();
            break;
          case "cap":
            title = capitalize(title);
        }
      }
      // 4. handle langCase
      if (lang) {
        switch (langCase) {
          case "up":
            lang = lang.toUpperCase();
            break;
          case "cap":
            lang = lang.charAt(0).toUpperCase() + lang.slice(1);
        }
      }

      // 5. add header's children
      let headerEl: Element | undefined;
      let headerChildren: Element[] = [];
      let langEl: Element;

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

      // 6. define header
      if (headerChildren.length !== 0) {
        headerEl = h("div", { class: headerClass }, headerChildren);
      }

      // 7. add header
      if (headerEl) {
        if (headerToBottom) {
          node.children.push(headerEl);
        } else {
          node.children.unshift(headerEl);
        }
      }
    },
  };
}
