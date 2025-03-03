export type HeaderOptions = {
  headerClass?: string;
  headerToBottom?: boolean;
  langCase?: "up" | "cap" | "none";
  langClass?: string;
  langFirst?: boolean;
  langVisible?: boolean;
  titleCase?: "up" | "low" | "cap" | "none";
  titleClass?: string;
  titleVisible?: boolean;
};

export type HeaderInfo = {
  title?: string;
  lang?: string;
};
