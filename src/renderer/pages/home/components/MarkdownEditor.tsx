import React, { useEffect, useState } from 'react';
import Cherry from 'cherry-markdown';
import { CherryOptions } from 'cherry-markdown/types/cherry';

import 'cherry-markdown/dist/cherry-markdown.css';

const MarkdownEditor: React.FC = () => {
  const editorRef = React.useRef(null);
  const [editor, setEditor] = React.useState<Cherry | null>(null);

  useEffect(() => {
    if (editor == null) {
      // Cherry.usePlugin(CherryMermaidPlugin, {
      //   mermaid, // 传入mermaid引用
      //   // mermaidAPI: mermaid.mermaidAPI, // 也可以传入mermaid API
      //   // 同时可以在这里配置mermaid的行为，可参考mermaid官方文档
      //   theme: 'dark',
      //   // sequence: { useMaxWidth: false, showSequenceNumbers: true }
      // });
      const config: CherryOptions = {
        el: editorRef.current!,
        value: '',
        editor: {
          // height: '100%',
        },
        callback: {
          afterChange: (md, html) => console.log('change'),
        },
        themeSettings: {
          // 主题列表，用于切换主题
          themeList: [
            { className: 'default', label: '默认' },
            { className: 'dark', label: '黑' },
            { className: 'light', label: '白' },
            { className: 'green', label: '绿' },
            { className: 'red', label: '粉' },
            { className: 'violet', label: '紫' },
            { className: 'blue', label: '蓝' },
          ],
          // 目前应用的主题
          mainTheme: 'light',
          // 目前应用的代码块主题
          codeBlockTheme: 'default',
          inlineCodeTheme: 'red',
          toolbarTheme: 'light',
        },

        toolbars: {
          // 配置切换主题的按钮到顶部工具栏里
          toolbar: [
            'bold',
            'italic',
            'size',
            '|',
            'color',
            'header',
            '|',
            'theme',
          ],
          // 配置切换主题的按钮到侧边栏里
          sidebar: ['mobilePreview', 'copy', 'theme'],
        },
      };

      setEditor(new Cherry(config));
    }
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-onOpenFile', (arg) => {
      console.log(arg);
      editor?.setMarkdown(arg as string);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners('ipc-onOpenFile');
    };
  }, [editor]);

  return (
    <div style={{ height: '100%' }}>
      <div ref={editorRef} id="markdown-container" />
    </div>
  );
};

export default MarkdownEditor;
