import { Lute } from "siyuan";

/**
 * 在思源笔记控制台中运行
 */
const md = `\`\`\`flowchart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
\`\`\``;

const lute = Lute.New();
let dom = lute.Md2BlockDOM(md);
console.log(dom);
siyuan.layout.rightDock.data.outline.update({data:[]})
