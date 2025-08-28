import React, { useEffect, useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import { Button, Layout, Tree } from 'tdesign-react';
import { TreeNodeModel } from 'tdesign-react/es/tree/type';
import { PhFileThin, PhFolderNotchThin } from '../../components/Icon';
import styles from './style.module.css';

const { Header, Content, Aside } = Layout;

type FileNode = {
  name: string;
  filePath: string;
  children: FileNode[];
};

const HomePage: React.FC = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-openFolder', (arg) => {
      console.log(arg);

      setFileTree((val) => [...val, arg as FileNode]);
    });
  }, []);

  const renderIcon = (node: TreeNodeModel<any>) => {
    if (node.data.children.length) return <PhFolderNotchThin fontSize={22} />;

    return <PhFileThin fontSize={22} />;
  };

  const openFolder = () => {
    window.electron.ipcRenderer.once('ipc-openFolder', (arg) => {
      setFileTree((val) => [...val, arg as FileNode]);
    });
    window.electron.ipcRenderer.sendMessage('ipc-openFolder', ['ping']);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header height="0"></Header>
      <Layout>
        <Aside style={{ borderTop: '1px solid rgba(255, 255, 255, 0.6)' }}>
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
            }}
          >
            <Tree
              style={{ width: '100%' }}
              data={fileTree}
              icon={renderIcon}
              lazy
              keys={{
                value: 'filePath',
                label: 'name',
              }}
              empty={
                <div className={styles.aside}>
                  <Button
                    variant="outline"
                    theme="default"
                    onClick={openFolder}
                  >
                    Open Folder
                  </Button>
                </div>
              }
            />
            <div className={styles.border}></div>
          </div>
        </Aside>
        <Layout>
          <Content style={{ height: '100%', margin: 10 }}>
            <MarkdownEditor />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
