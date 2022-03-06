import React, { useEffect, useRef, useState } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { MdFileDownload } from 'react-icons/md'
import Papa from "papaparse";

function App() {
  // A reference to the div rendered by this component
  const domNode = useRef(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const [UniqueNodes, setUniqueNodes] = useState([])
  
  // A reference to the vis network instance
  const network = useRef(null)
  var ss = 'box'
  var ww = { id: 1, label: 'Node 1', shape: ss }

  // An array of nodes
  // const nodes = new DataSet([
  //   { id: 1, label: 'Node 1', shape: ss },
  //   { id: 2, label: 'Node 2', shape: ss },
  //   { id: 3, label: 'Node 3', shape: ss },
  //   { id: 4, label: 'Node 4', shape: ss },
  //   { id: 5, label: 'Node 5', shape: ss },
  // ])

  // An array of edges
  // const edges = new DataSet([
  //   { from: 1, to: 3, arrows: 'to' },
  //   { from: 1, to: 2, arrows: 'to' },
  //   { from: 2, to: 4, arrows: 'to' },
  //   { from: 2, to: 5, arrows: 'to' },
  //   { from: 5, to: 4, arrows: 'to' },
  //   { from: 1, to: 3, arrows: 'to' },
  // ])

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
        springConstant: 0.035,
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
    nodes:{
      widthConstraint:{maximum:200}
  },
    autoResize: true,
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  useEffect(() => {
    network.current = new Network(domNode.current, data, options)
    network.current.on("stabilizationIterationsDone",  function () {
      this.setOptions({ physics: false } )
  });

  }, [domNode, network, data, options])

  const download = () => {}

  const handleFileUpload = async (e) => {  
    const files = e.target.files;
    var nodeSet = new Set()
    var n = []
    var n1 = [];
    var e = [];
    if (files) {
      Papa.parse(files[0], { header: true, skipEmptyLines: true,
        complete: function(results) {
          console.log(results.data);
          results.data.forEach((row) => {
            nodeSet.add(row.FROM)
            nodeSet.add(row.TO)

            var edgeObj = new Object();
            edgeObj.from = row.FROM;
            edgeObj.to = row.TO;
            edgeObj.arrows = "to"
            edgeObj.label = row.REL
            e.push(edgeObj)


            
        });
        n = Array.from(nodeSet)
        n.forEach((node) => {
        var obj = new Object();
        obj.id = node;
        obj.label  = node;
        obj.shape = "box";
        n1.push(obj)
      })        
      
      setNodes(n1)
      setEdges(e)

      }
    }
        
      )
  
    }}


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-11/12 h-5/6 border-2 rounded-lg" ref={domNode}></div>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
      />
        <button onClick={download} className="flex items-center gap-2 bg-black px-5 py-1.5 my-4 text-white">
          Export diagram
          <MdFileDownload color="white" size={20} />
        </button>
      </div>
    </>
  )
}

export default App
