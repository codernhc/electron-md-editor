import * as React from 'react';
import 'cherry-markdown/dist/cherry-markdown.css';
import Cherry from 'cherry-markdown';



const App = () => {

  const editorRef = React.useRef(null);
  const [editor, setEditor] = React.useState(null);

  React.useEffect(() => {
    if (editor == null) {
      // 初始化编辑器
      const config = {
        el: editorRef.current,
        value: '',
        callback: {
          afterChange: (md, html) => console.log('change'),
        },
      };
      setEditor(new Cherry(config));
    }
  }, []);

  return (
    <>
      <main>
        <div className='main-wrapper'>
          <div ref={editorRef} id="markdown-container" />
        </div>
      </main>
    </>
  );
}

export default App
