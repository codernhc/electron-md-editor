import React, { useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import { Button, Layout, Tree } from 'tdesign-react';
import { TreeNodeModel } from 'tdesign-react/es/tree/type';
import { PhFileThin, PhFolderNotchThin } from '../../components/Icon';

const { Header, Content, Aside } = Layout;

type FileNode = {
  name: string;
  filePath: string;
  children: FileNode[];
};

const HomePage: React.FC = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

  const openFolder = () => {
    window.electron.ipcRenderer.once('ipc-openFolder', (arg) => {
      setFileTree((val) => [...val, arg as FileNode]);
    });
    window.electron.ipcRenderer.sendMessage('ipc-openFolder', ['ping']);
  };

  const renderIcon = (node: TreeNodeModel<any>) => {
    if (node.data.children.length) return <PhFolderNotchThin fontSize={22} />;

    return <PhFileThin fontSize={22} />;
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header height="30">
        <Button onClick={openFolder}>打开文件夹</Button>
      </Header>
      <Layout>
        <Aside style={{ borderTop: '1px solid rgba(255, 255, 255, 0.6)' }}>
          <Tree
            data={fileTree}
            icon={renderIcon}
            lazy
            keys={{
              value: 'filePath',
              label: 'name',
            }}
          />
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
