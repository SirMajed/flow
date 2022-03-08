import React, { useEffect, useRef, useState } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { MdFileDownload } from 'react-icons/md'
import Papa from 'papaparse'
import TitleBar from '../src/components/TitleBar'
function App() {
  // A reference to the div rendered by this component
  const domNode = useRef(null)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const [UniqueNodes, setUniqueNodes] = useState([])

  // A reference to the vis network instance
  const network = useRef(null)
  // var ss = 'circle'
  // var ww = { id: 1, label: 'Node 1', shape: ss }

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
        gravitationalConstant: -40,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.035,
        avoidOverlap: 1,
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
    nodes: {
      widthConstraint: { maximum: 200 },
    },
    
    edges: {
      selectionWidth: function (width) {return width*2;},
        font: {
        align: "top",
        background: "white"
   
      },

    },
    autoResize: true,
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  useEffect(() => {
    network.current = new Network(domNode.current, data, options)
    network.current.on('stabilizationIterationsDone', function () {
      this.setOptions({ physics: false })
    })
  }, [domNode, network, data, options])

  const download = () => {}

  const handleFileUpload = async (e) => {
    const files = e.target.files
    var nodeSet = new Set()
    var n = []
    var n1 = []
    var ed = []
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data)
          results.data.forEach((row) => {
            nodeSet.add(row.FROM)
            nodeSet.add(row.TO)

            // var edgeObj = new Object()

            var edgeObj = {
              from: row.FROM,
              to: row.TO,
              arrows: 'to',
              label: row.REL,
              width: row.Weight,
              color: row.RELCOLOR
            };
            // edgeObj.from = row.FROM
            // edgeObj.to = row.TO
            // edgeObj.arrows = 'to'
            // edgeObj.label = row.REL
            // edgeObj.width = row.Weight
            // edgeObj.color = row.RELCOLOR
            ed.push(edgeObj)
          })
          n = Array.from(nodeSet)
          n.forEach((node) => {
            var obj ={
              id: node,
              label:  node,
              shape:  'box',
              // color: 'none'
            };
            
            n1.push(obj)
          })

          setNodes(n1)
          setEdges(ed)
        },
      })
    }
  }

  return (
    <>
      <TitleBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-11/12 h-5/6 my-4 border-2 rounded-lg" ref={domNode}></div>
        {/* <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
        <button onClick={download} className="flex items-center gap-2 bg-black px-5 py-1.5 my-4 text-white">
          Upload .csv file
          <MdFileDownload color="white" size={20} />
        </button> */}

        <label className="block">
          <input
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            type="file"
            className="block w-full text-sm text-tlight dark:text-tdark
                          file:py-2 file:px-4
                           file:border-0
                          file:text-sm file:font-semibold
                          file:bg-black file:dark:bg-darkField file:text-white dark:text-opacity-50
                          hover:file:bg-opacity-80
                          focus:outline-none
                        "
          />
        </label>
      </div>
    </>
  )
}

export default App
