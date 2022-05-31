import React, { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network/standalone/esm/vis-network'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPosX, addPosY, hideEdge, hideNode } from 'redux/slices/stakeholderSlice'
import ResultsNav from 'components/ResultsNav'
const Results = () => {
  const domNode = useRef(null)
  const navigate = useNavigate()
  const { stakeholders, relations, stakeholdersTypes, relationsTypes } = useSelector((s) => s.stakeholders)

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const network = useRef(null)
  const data = {
    nodes,
    edges,
  }

  const options = {
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
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
        size: 25,
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
      smooth: {
        type: 'continuous',

        forceDirection: 'none',
      },
      font: {
        size: 25,
        align: 'top',
        background: 'white',
      },
    },
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setEdges(relations)
    setNodes(stakeholders)

    if (network.current) {
      network.current.setOptions({ physics: false })
    }
    network.current = network.currnet || new Network(domNode.current, data, options)
    network.current.on('stabilizationIterationsDone', function () {
      this.setOptions({ physics: false })
    })

    network.current.on('click', function (n) {
      var tempNodes = []
      nodes.forEach((node) => {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        dispatch(addPosX({ id: node.id, posX: posX }))
        dispatch(addPosY({ id: node.id, posY: posY }))
        tempNodes.push(node)
      })

      if (network.current && n.nodes.length > 0) {
        var nnn = network.current.getConnectedNodes(n.nodes[0])

        nnn.push(n.nodes[0])

        tempNodes = []
        nodes.forEach((e) => {
          if (!nnn.includes(e.id)) {
            const position = network.current.getPositions([e.id])
            const posX = position[`${e.id}`].x
            const posY = position[`${e.id}`].y
            dispatch(addPosX({ id: e.id, posX: posX }))
            dispatch(addPosY({ id: e.id, posY: posY }))
            dispatch(hideNode({ id: e.id, hidden: true }))
          }
          tempNodes.push(e)
        })
      }

      if (n.items.length === 0 && n.nodes.length === 0 && n.edges.length === 0) {
        tempNodes = []
        nodes.forEach((e) => {
          const position = network.current.getPositions([e.id])
          const posX = position[`${e.id}`].x
          const posY = position[`${e.id}`].y
          dispatch(addPosX({ id: e.id, posX: posX }))
          dispatch(addPosY({ id: e.id, posY: posY }))
          dispatch(hideNode({ id: e.id, hidden: false }))

          tempNodes.push(e)
        })
      }
      setNodes(tempNodes)
    })

    network.current.on('afterDrawing', function (ctx) {
      var dataURL = ctx.canvas.toDataURL()
      document.getElementById('canvasImg').href = dataURL
    })
  }, [domNode, network, nodes, options])

  const handleNodeFilter = (e) => {
    const tempNodes = []
    nodes.forEach((node) => {
      const position = network.current.getPositions([node.id])
      const posX = position[`${node.id}`].x
      const posY = position[`${node.id}`].y
      dispatch(addPosX({ id: node.id, posX: posX }))
      dispatch(addPosY({ id: node.id, posY: posY }))
      dispatch(hideNode({ id: node.id, hidden: false }))

      if (e.target.value === 'none') {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        dispatch(addPosX({ id: node.id, posX: posX }))
        dispatch(addPosY({ id: node.id, posY: posY }))
        dispatch(hideNode({ id: node.id, hidden: false }))
      } else if (node.type.toString() !== e.target.value.toString()) {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        dispatch(addPosX({ id: node.id, posX: posX }))
        dispatch(addPosY({ id: node.id, posY: posY }))
        dispatch(hideNode({ id: node.id, hidden: true }))
      }
      tempNodes.push(node)
    })

    setNodes(tempNodes)
  }

  const handleEdgeFilter = (e) => {
    const tempEdges = []
    relations.forEach((edge) => {
      dispatch(hideEdge({ id: edge.id, hidden: false }))
      if (e.target.value === 'none') {
        dispatch(hideEdge({ id: edge.id, hidden: false }))
      } else if (edge.type.toString() !== e.target.value.toString()) {
        dispatch(hideEdge({ id: edge.id, hidden: true }))
      }
      tempEdges.push(edge)
    })

    setEdges(tempEdges)
  }

  const downloadNetworkAsImage = () => {
    document.getElementById('canvasImg').click()
  }
  const confirmReset = () => {
    var answer = window.confirm('هل انت متأكد من البدء من جديد؟')
    if (answer) {
      navigate('/stakeholders')
    } else {
      return null
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <ResultsNav
          confirmReset={confirmReset}
          downloadNetworkAsImage={downloadNetworkAsImage}
          handleEdgeFilter={handleEdgeFilter}
          handleNodeFilter={handleNodeFilter}
          relationsTypes={relationsTypes}
          stakeholdersTypes={stakeholdersTypes}
        />

        <div className="w-full my-t-4 mb-1 h-screen" ref={domNode} />
        <a id="canvasImg" download="filename"></a>
        <div className="flex items-center gap-3"></div>
      </div>
    </>
  )
}

export default Results
