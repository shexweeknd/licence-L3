import { treeData } from "./data";

const TreeNode = ({ data }) => (
    <ul>
      {data.map((item) => (
        <li key={item.path}>
          {item.type === "folder" ? (
            <>
              {item.name}
              <TreeNode data={item.children} />
            </>
          ) : (
            <a href={item.path}>{item.name}</a>
          )}
        </li>
      ))}
    </ul>
)

export default function TreeView() {
  return <TreeNode data={treeData.children} />;
}
