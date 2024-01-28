export interface SyTableCell {
  Type: "NodeTableCell";
  Data: "th" | "td";
  Properties: {
    colspan?: string;
    rowspan?: string;
    class?: "fn__none";
  };
  Children: inlineSpan[];
}

interface inlineSpan {
  Type: string;
  Data: string;
}
