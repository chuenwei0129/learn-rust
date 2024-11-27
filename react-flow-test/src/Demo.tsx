import {
  addEdge,
  Background,
  BackgroundVariant,
  BaseEdge,
  type Connection,
  Controls,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
  Handle,
  Position,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  {
    id: '1',
    type: 'red',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'blue',
    data: { label: 'Default Node' },
    position: { x: 100, y: 100 },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'e1-2', type: 'custom' },
]

// 自定义节点
interface NodePorps {
  data: {
    label: string
  }
}
function RedNode({ data }: NodePorps) {
  return (
    <div
      style={{
        background: 'red',
        width: '100px',
        height: '100px',
        textAlign: 'center',
      }}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />

      <div>{data.label}</div>
    </div>
  )
}

function BlueNode({ data }: NodePorps) {
  return (
    <div
      style={{
        background: 'blue',
        width: '50px',
        height: '50px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />

      <div>{data.label}</div>
    </div>
  )
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow()

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id))
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // EdgeLabelRenderer 里的组件默认不处理鼠标事件，如果要处理就要声明 pointerEvents: all
            pointerEvents: 'all',
          }}
        >
          <button onClick={onEdgeClick}>×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = (params: Connection) => {
    setEdges((edges) => addEdge(params, edges))
  }

  return (
    <div
      style={{
        width: '800px',
        height: '600px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      <ReactFlow
        onConnect={onConnect}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{
          red: RedNode,
          blue: BlueNode,
        }}
        edgeTypes={{
          custom: CustomEdge,
        }}
      >
        <Controls />
        <MiniMap zoomable />
        <Background variant={BackgroundVariant.Lines} />
        <Panel position="top-right">
          <button
            onClick={() => {
              setNodes([
                ...nodes,
                {
                  id: Math.random().toString().slice(2, 6) + '',
                  type: 'red',
                  position: { x: 0, y: 0 },
                  data: {
                    label: '新节点',
                  },
                },
              ])
            }}
          >
            添加节点
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export default App
