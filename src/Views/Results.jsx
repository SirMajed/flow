import React, { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network/standalone/esm/vis-network'
import { useDispatch, useSelector } from 'react-redux'
import { MdFileDownload } from 'react-icons/md'
import Button from 'components/Button'
const Results = () => {
  const domNode = useRef(null)
  const { stakeholders, relations, stakeholdersTypes, relationsTypes } = useSelector((s) => s.stakeholders) //ndoes
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  // A reference to the vis network instance
  const network = useRef(null)
  const data = {
    nodes,
    edges,
  }

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
  console.log(edges)
  console.log(nodes)

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
    // console.log(network.current)

    network.current.on('click', function (n) {
      // console.log(n);
      // console.log(n.nodes.length);

      var tempNodes = []
      nodes.forEach((node) => {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        node.x = posX
        node.y = posY
        // e.hidden = false

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
            e.x = posX
            e.y = posY
            e.hidden = true
          }
          tempNodes.push(e)
        })
        // nod = tempNodes
        // setNodes(tempNodes)
      }

      if (n.items.length === 0 && n.nodes.length === 0 && n.edges.length === 0) {
        tempNodes = []
        nodes.forEach((e) => {
          const position = network.current.getPositions([e.id])
          const posX = position[`${e.id}`].x
          const posY = position[`${e.id}`].y
          e.x = posX
          e.y = posY
          e.hidden = false

          tempNodes.push(e)
        })
        // nod = tempNodes
      }
      setNodes(tempNodes)

      // console.log(nod)
    })

    network.current.on('afterDrawing', function (ctx) {
      // this.setOptions({ physics: false })
      var dataURL = ctx.canvas.toDataURL()
      document.getElementById('canvasImg').href = dataURL
    })
  }, [domNode, network, nodes, options])

  const handleNodeFilter = (e) => {}

  const handleEdgeFilter = (e) => {
    const tempEdges = []
    relations.forEach((edge) => {
      edge.hidden = false
      if (e.target.value === 'none') {
        edge.hidden = false
      } else if (edge.type !== e.target.value) {
        edge.hidden = true
      }
      tempEdges.push(edge)
    })

    // setEdges(tempEdges)
  }

  const downloadNetworkAsImage = () => {
    document.getElementById('canvasImg').click()
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="flex-col justify-center items-center mx-auto w-11/12">
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">النتائج</h1>

          <div className="w-full border my-6">
            <div className="w-11/12 h-5/6 my-t-4 mb-1 relative">
              <select
                defaultValue={'DEFAULT'}
                id="nodeType"
                className="absolute top-0 right-0 z-10 bg-primary gap-2 px-2 py-1.5 my-1 mx-2 text-white"
                onChange={handleNodeFilter}
              >
                <option value="DEFAULT" disabled>
                  Stakeholders filter
                </option>
                {stakeholdersTypes.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                defaultValue={'DEFAULT'}
                id="relationType"
                className="absolute top-0 right-20 z-10 bg-primary gap-2 px-5 py-1.5 my-1 mr-28 text-white"
                onChange={handleEdgeFilter}
              >
                <option value="DEFAULT" disabled>
                  Relation filter
                </option>
                {relationsTypes.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="w-full my-t-4 mb-1 h-[40rem]" ref={domNode} />
              <a id="canvasImg" download="filename"></a>
            </div>
          </div>
        </div>
        <Button icon={<MdFileDownload color="white" size={20} />} text="تحميل" onClick={downloadNetworkAsImage} />
      </div>
    </>
  )
}

export default Results
