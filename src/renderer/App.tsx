// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.css';
import { CherryOptions } from 'cherry-markdown/types/cherry';

function MarkdownEditor() {
  const editorRef = React.useRef(null);
  const [editor, setEditor] = React.useState<Cherry | null>(null);

  React.useEffect(() => {
    if (editor == null) {
      // 初始化编辑器
      const config: CherryOptions = {
        el: editorRef.current!,
        value: '',
        callback: {
          afterChange: (md, html) => console.log('change'),
        },
      };

      setEditor(new Cherry(config));
    }
  }, []);

  return (
    <main>
      <>hello world</>
      {/*<div className="main-wrapper">*/}
      {/*  <div ref={editorRef} id="markdown-container" />*/}
      {/*</div>*/}
    </main>
  );
}

export default function App() {
  return (
    <>ladjksdasl;jkaljks</>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<MarkdownEditor />} />
    //   </Routes>
    // </Router>
  );
}
