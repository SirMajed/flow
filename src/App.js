import React, { useEffect, useRef } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { MdFileDownload } from 'react-icons/md'
function App() {
  // A reference to the div rendered by this component
  const domNode = useRef(null)

  // A reference to the vis network instance
  const network = useRef(null)
  var ss = 'box'
  var ww = { id: 1, label: 'Node 1', shape: ss }

  // An array of nodes
  const nodes = new DataSet([
    { id: 1, label: 'Node 1', shape: ss },
    { id: 2, label: 'Node 2', shape: ss },
    { id: 3, label: 'Node 3', shape: ss },
    { id: 4, label: 'Node 4', shape: ss },
    { id: 5, label: 'Node 5', shape: ss },
  ])

  // An array of edges
  const edges = new DataSet([
    { from: 1, to: 3, arrows: 'to' },
    { from: 1, to: 2, arrows: 'to' },
    { from: 2, to: 4, arrows: 'to' },
    { from: 2, to: 5, arrows: 'to' },
    { from: 5, to: 4, arrows: 'to' },
    { from: 1, to: 3, arrows: 'to' },
  ])

  const data = {
    nodes,
    edges,
  }

  const options = {
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.02,
        avoidOverlap: 0.2,
      },
      maxVelocity: 146,
      solver: 'forceAtlas2Based',
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 10000,
        updateInterval: 500,
        fit: true,
      },
    },
    autoResize: true,
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  useEffect(() => {
    network.current = new Network(domNode.current, data, options).setOptions({
      physics: false,
    })
  }, [domNode, network, data, options])

  const download = () => {}

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-11/12 h-5/6 border-2 rounded-lg" ref={domNode}></div>
        <button onClick={download} className="flex items-center gap-2 bg-black px-5 py-1.5 my-4 text-white">
          Export diagram
          <MdFileDownload color="white" size={20} />
        </button>
      </div>
    </>
  )
}

export default App
