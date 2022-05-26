import UploadFileView from 'components/UploadFileView'
import React, { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network/standalone/esm/vis-network'
import Papa from 'papaparse'
import TitleBar from 'components/TitleBar'
import isElectron from 'is-electron'
import whiteLogo from '../assets/images/whiteLogo.png'
import Team from 'components/Team'
import DataForm from 'components/DataForm'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholderArray } from 'redux/slices/stakeholderSlice'
const Results = () => {
  const domNode = useRef(null)
  const inputRefOne = useRef()
  const inputRefTwo = useRef()

  const [file1, setFile1] = useState(null)

  const relations = useSelector((s) => s.stakeholders.relations) // edges
  const { stakeholders } = useSelector((s) => s.stakeholders) //ndoes
  console.log(relations)
  console.log(stakeholders)
  // A reference to the vis network instance
  const network = useRef(null)
  const data = {
    nodes: stakeholders,
    edges: relations,
  }

  console.log(data)
  const options = {
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.0015,
        springLength: 200,
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
      font: {
        size: 20,
      },
    },

    edges: {
      physics: false,
      selectionWidth: function (width) {
        return width * 2
      },
      hoverWidth: function (width) {
        return width * 2
      },
      // smooth: false,
      smooth: {
        type: 'continuous',

        forceDirection: 'none',
      },
      font: {
        align: 'top',
        background: 'white',
      },
    },
    // autoResize: true,
    // scale : 2.5,
    // interaction: { hover: true, hideEdgesOnDrag:true },
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (network.current) {
      network.current.setOptions({ physics: false })
    }
    network.current = network.currnet || new Network(domNode.current, data, options)
    network.current.on('stabilizationIterationsDone', function () {
      this.setOptions({ physics: false })
    })
    // console.log(network.current)

    // network.current.on('click', function (n) {
    //   console.log(n)
    //   // console.log(n);
    //   // console.log(n.nodes.length);

    //   var tempNodes = []
    //   stakeholders.forEach((e) => {
    //     const position = network.current.getPositions([e.id])
    //     const posX = position[`${e.id}`].x
    //     const posY = position[`${e.id}`].y
    //     e.x = posX
    //     e.y = posY
    //     // e.hidden = false

    //     tempNodes.push(e)
    //   })

    //   if (network.current && n.nodes.length > 0) {
    //     var nnn = network.current.getConnectedNodes(n.nodes[0])

    //     nnn.push(n.nodes[0])

    //     tempNodes = []
    //     stakeholders.forEach((e) => {
    //       if (!nnn.includes(e.id)) {
    //         const position = network.current.getPositions([e.id])
    //         const posX = position[`${e.id}`].x
    //         const posY = position[`${e.id}`].y
    //         e.x = posX
    //         e.y = posY
    //         e.hidden = true
    //       }
    //       tempNodes.push(e)
    //     })
    //     // nod = tempNodes
    //     // setNodes(tempNodes)
    //   }

    //   if (n.items.length === 0 && n.nodes.length === 0 && n.edges.length === 0) {
    //     tempNodes = []
    //     stakeholders.forEach((e) => {
    //       const position = network.current.getPositions([e.id])
    //       const posX = position[`${e.id}`].x
    //       const posY = position[`${e.id}`].y
    //       e.x = posX
    //       e.y = posY
    //       e.hidden = false

    //       tempNodes.push(e)
    //     })
    //     // nod = tempNodes
    //   }
    //   // setNodes(tempNodes)

    //   // console.log(nod)
    // })

    network.current.on('afterDrawing', function (ctx) {
      // this.setOptions({ physics: false })
      var dataURL = ctx.canvas.toDataURL()
      document.getElementById('canvasImg').href = dataURL
    })
  }, [domNode, network, stakeholders, options])

  // const handleFileOne = (e) => {
  //   const colorList = ['#fc8d8d', '#f8ffc7', '#ededed', '#34eb9b'] // [red, yellow, grey, green]
  //   const file = e.target.files[0]
  //   var typesSet = new Set()
  //   var types = []
  //   var dict = {}

  //   setFile1(file)
  //   if (file) {
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: function (results) {
  //         var n = []
  //         results.data.forEach((row) => {
  //           typesSet.add(row.TYPE)
  //         })

  //         types = Array.from(typesSet)
  //         types.forEach((type, index) => {
  //           dict[type] = colorList[index]
  //         })
  //         setNodeType(types)
  //         console.log(types)
  //         results.data.forEach((row) => {
  //           var obj = {
  //             id: row.NAME,
  //             label: row.NAME,
  //             shape: 'box',
  //             type: row.TYPE,
  //           }
  //           if (Object.keys(dict).includes(row.TYPE)) {
  //             obj.color = dict[row.TYPE]
  //           }
  //           n.push(obj)
  //         })
  //         console.log(n)
  //         setNodes(n)
  //       },
  //     })
  //   }
  // }
  // const handleFileTwo = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     var e = []
  //     var edgeSet = new Set()
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: function (results) {
  //         results.data.forEach((row) => {
  //           edgeSet.add(row.relType)
  //           var edgeObj = {
  //             from: row.FROM,
  //             to: row.TO,
  //             arrows: 'to',
  //             label: row.REL,
  //             width: (row.Weight * 10) / 1.2,
  //             color: row.RELCOLOR,
  //             type: row.relType,
  //           }
  //           e.push(edgeObj)
  //         })
  //         setEdgesType(Array.from(edgeSet))
  //         setEdges(e)
  //       },
  //     })
  //   }
  // }

  // const handleClear = () => {
  //   inputRefOne.current.value = ''
  //   inputRefTwo.current.value = ''
  //   setEdges([])
  //   setNodes([])
  //   setEdgesType([])
  //   setNodeType([])
  // }

  // const handleNodeFilter = (e) => {
  //   const tempNodes = []
  //   stakeholders.forEach((node) => {
  //     const position = network.current.getPositions([node.id])
  //     const posX = position[`${node.id}`].x
  //     const posY = position[`${node.id}`].y
  //     node.x = posX
  //     node.y = posY
  //     node.hidden = false
  //     if (e.target.value === 'none') {
  //       const position = network.current.getPositions([node.id])
  //       const posX = position[`${node.id}`].x
  //       const posY = position[`${node.id}`].y
  //       node.x = posX
  //       node.y = posY
  //       node.hidden = false
  //     } else if (node.type !== e.target.value) {
  //       const position = network.current.getPositions([node.id])
  //       const posX = position[`${node.id}`].x
  //       const posY = position[`${node.id}`].y
  //       node.x = posX
  //       node.y = posY
  //       node.hidden = true
  //     }
  //     tempNodes.push(node)
  //   })

  //   setNodes(tempNodes)
  // }

  // const handleEdgeFilter = (e) => {
  //   const tempEdges = []
  //   relations.forEach((edge) => {
  //     edge.hidden = false
  //     if (e.target.value === 'none') {
  //       edge.hidden = false
  //     } else if (edge.type !== e.target.value) {
  //       edge.hidden = true
  //     }
  //     tempEdges.push(edge)
  //   })

  //   setEdges(tempEdges)
  // }

  // function scrollTo(e) {
  //   const divElement = document.getElementById('main')
  //   divElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  // }
  // function scrollToCont() {
  //   const divElement = document.getElementById('cont')
  //   divElement.scrollIntoView({ behavior: 'smooth' })
  // }

  // const downloadNetworkAsImage = () => {
  //   document.getElementById('canvasImg').click()
  // }
  return (
    <>
      <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12">
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">النتائج</h1>

          <div className="w-full border my-10">
            <div className="w-full my-t-4 mb-1 h-[40rem]" ref={domNode} />
            <a id="canvasImg" download="filename"></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Results
