// components/MarkdownViewer.js

import React from 'react';
import Markdown from 'markdown-to-jsx';


export default function MarkdownViewer({ prompt }) {

  return (
    <div className='p-1 pb-0 min-h-min overflow-auto moderscroller '
    >
      <Markdown options={{
        overrides: {
          ul: {
            component: 'ul',
            props: {
              className: 'list-disc list-inside' //  Tailwind for unordered lists
            }
          },
          ol: {
            component: 'ol',
            props: {
              className: 'list-decimal list-inside' // Tailwind for ordered lists
            }
          }
        }
      }}>
        {prompt.replace(/\n\n/g, '<br><br>\n')}
      </Markdown>
    </div>
  );
}

// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// export default function MarkdownViewer({ prompt }) {

//   return (
//     <div className='p-1 pb-0 min-h-min overflow-auto moderscroller'
//       style={{ whiteSpace: 'break-spaces' }}
//     >
//       <ReactMarkdown remarkPlugins={[remarkGfm]} >
//         {prompt.replace(/\n\n/g, '<br><br>\n')}
//       </ReactMarkdown>
//     </div>
//   );
// }