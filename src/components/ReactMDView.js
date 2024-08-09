//  components/MarkdownViewer.js
// import Markdown from 'markdown-to-jsx';
// export default function MarkdownViewer({ prompt }) {
//   return (
//     <div className='p-1 pb-0 min-h-min overflow-auto moderscroller'>
//       <Markdown className="markdown-container">
//         {prompt}
//       </Markdown>
//     </div>
//   );
// }


import ReactMarkdown from 'react-markdown';
import  remarkGfm from 'remark-gfm';
export default function MarkdownViewer({ prompt }) {
  return (
    <div className="p-1 pb-0 min-h-min overflow-auto moderscroller whitespace-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-container">
        {prompt}
      </ReactMarkdown>
    </div>
  )
}