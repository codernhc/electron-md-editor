import React from 'react';
import Cherry from 'cherry-markdown';
import { CherryOptions } from 'cherry-markdown/types/cherry';

import 'cherry-markdown/dist/cherry-markdown.css';

const MarkdownEditor: React.FC = () => {
  const editorRef = React.useRef(null);
  const [editor, setEditor] = React.useState<Cherry | null>(null);

  React.useEffect(() => {
    if (editor == null) {
      // 初始化编辑器
      const config: CherryOptions = {
        el: editorRef.current!,
        value: '',
        editor: {
          // height: '100%',
        },
        callback: {
          afterChange: (md, html) => console.log('change'),
        },
      };

      setEditor(new Cherry(config));
    }
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <div ref={editorRef} id="markdown-container" />
    </div>
  );
};

export default MarkdownEditor;
