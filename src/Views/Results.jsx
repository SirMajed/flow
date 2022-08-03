import React, { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network/standalone/esm/vis-network'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPosX, addPosY, hideEdge, hideNode, updateRelation } from 'redux/slices/stakeholderSlice'
import ResultsNav from 'components/ResultsNav'
import { Modal } from 'components/Modal'
import { t } from 'i18next'
import { IoRibbonSharp } from 'react-icons/io5'
const Results = () => {
  const domNode = useRef(null)
  const navigate = useNavigate()
  const { stakeholders, relations, stakeholdersTypes, relationsTypes } = useSelector((s) => s.stakeholders)

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [level, setLevel] = useState(1)
  const [firstTime, setFirstTime] = useState(true)

  // const roundness = [0.2, -2.2, 0.5, -2.5, 0.8, -3]
  const roundness = [{type: 'horizontal', roundness: 0.2}, {type: 'vertical', roundness: 0.2}, {type: 'horizontal', roundness: 0.8}, {type: 'vertical', roundness: 0.8}, {type: 'horizontal', roundness: 1.5}, {type: 'vertical', roundness: 1.5}]

  const network = useRef(null)
  const data = {
    nodes,
    edges,
  }

  const options = {
    physics: {
      // Even though it's disabled the options still apply to network.stabilize().
      enabled: true,
      solver: "repulsion",
      repulsion: {
        nodeDistance: 500, // Put more distance between the nodes.
        // springLength: 200,
        // springConstant: 1,
        // centralGravity: 0.3
      },
        stabilization: {
        enabled: true,
        iterations: 10000,
        updateInterval: 500,
        fit: true,
      },
    },
    layout: {
      randomSeed: 1,
    },
    // layout: {
    //   improvedLayout:true,

    // },
    // physics: {
    //   forceAtlas2Based: {
    //     gravitationalConstant: -59,
    //     centralGravity: 0.0015,
    //     springLength: 200,
    //     springConstant: 1,
    //     avoidOverlap: 1,
    //   },
    //   maxVelocity: 146,
    //   solver: 'forceAtlas2Based',
    //   timestep: 0.35,
    //   stabilization: {
    //     enabled: true,
    //     iterations: 10000,
    //     updateInterval: 500,
    //     fit: true,
    //   },
    // },
    nodes: {
      widthConstraint: { maximum: 300 },
      font: {
        size: 32,
      },
    },
    edges: {
      // physics: false,
      // length: 100,
      
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
        size: 20,
        align: 'top',
        background: 'white',
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 300,
    },
    height: '100%',
    width: '100%',
    clickToUse: false,
  }

  const dispatch = useDispatch()
  const [openWarnModal, setOpenWarnModal] = useState(false)
  const closeWarnModal = () => {
    setOpenWarnModal(false)
  }
  const toggleWarnModal = () => {
    setOpenWarnModal(!openWarnModal)
  }

  useEffect(() => {
    if (stakeholders.length <= 0 || relations.length <= 0) {
      toggleWarnModal()
    }
  }, [])

  useEffect(() => {
    setEdges(relations)
    setNodes(stakeholders)

    if (network.current) {
      network.current.setOptions({ physics: false })
      
    }
    network.current = network.currnet || new Network(domNode.current, data, options)
    // network.current.once('afterDrawing', function (){
    //   console.log(121222);
    //   console.log(level);
    //   if(level === 1){
    //     this.moveTo({scale: 0.5})
    //   }

    //   edges.forEach((edge) => {
    //     // console.log(edge);
    //     const length = 1000 / edge.width
    //     console.log(length);
    //     dispatch(updateRelation({ id: edge.id, length }))
    //   });
    // })
    network.current.on('stabilizationIterationsDone', function () {
      this.setOptions({ physics: false });
      if (level === 2){
        this.moveTo({scale: 1});
      }
      // if (level === 1 && !firstTime){
      //   this.moveTo({scale: 0.33});
      // }
    })
    network.current.on('zoom', function(n) {
      let count = 0;
      // nodes.forEach((node) => {
      //   console.log(node.x);
      // });
      console.log(n.scale);
      if(n.scale > 1 && level === 1){
        if (firstTime){
          nodes.forEach((node) => {
            const position = network.current.getPositions([node.id])
            const posX = position[`${node.id}`].x
            const posY = position[`${node.id}`].y
            dispatch(addPosX({ id: node.id, posX: posX, posY: posY }))
  
          })
          setFirstTime(false)
        }
        
        
        edges.forEach((edge) => {
          if (edge.level === 1) {
            dispatch(hideEdge({ id: edge.id, hidden: true }))
          }
          else if (edge.level === 2){
            dispatch(updateRelation({ id: edge.id, smooth: roundness[count]}))
            dispatch(hideEdge({ id: edge.id, hidden: false }))
            count++
          }
        })
        setLevel(2)
        
      }
      else if(n.scale < 0.7 && level === 2){
        const tempEdges = []
        edges.forEach((edge) => {
          if (edge.level === 1) {
            dispatch(hideEdge({ id: edge.id, hidden: false }))
          }
          else if (edge.level === 2){
            dispatch(hideEdge({ id: edge.id, hidden: true }))
          }
        })
        setLevel(1)
      }
      
    })
    network.current.on('click', function (n) {

      if (network.current && n.nodes.length > 0) {
        var nnn = network.current.getConnectedNodes(n.nodes[0])

        nnn.push(n.nodes[0])

        // tempNodes = []
        nodes.forEach((e) => {
          if (!nnn.includes(e.id)) {
            const position = network.current.getPositions([e.id])
            const posX = position[`${e.id}`].x
            const posY = position[`${e.id}`].y
            // dispatch(addPosX({ id: e.id, posX: posX, posY: posY }))
            // dispatch(addPosY({ id: e.id, posY: posY }))
            dispatch(hideNode({ id: e.id, hidden: true,posX, posY  }))
          }
          // tempNodes.push(e)
        })
      }

      if (n.items.length === 0 && n.nodes.length === 0 && n.edges.length === 0) {
        // tempNodes = []
        nodes.forEach((e) => {
          const position = network.current.getPositions([e.id])
          const posX = position[`${e.id}`].x
          const posY = position[`${e.id}`].y
          // dispatch(addPosX({ id: e.id, posX: posX, posY: posY }))
          // dispatch(addPosY({ id: e.id, posY: posY }))
          dispatch(hideNode({ id: e.id, hidden: false, posX, posY }))

          // tempNodes.push(e)
        })
      }
      // setNodes(tempNodes)
    })

    network.current.on('afterDrawing', function (ctx) {
      var dataURL = ctx.canvas.toDataURL()
      document.getElementById('canvasImg').href = dataURL
    })
  }, [domNode, network, options])

  const handleNodeFilter = (e) => {
    const tempNodes = []
    nodes.forEach((node) => {
      const position = network.current.getPositions([node.id])
      const posX = position[`${node.id}`].x
      const posY = position[`${node.id}`].y
      dispatch(addPosX({ id: node.id, posX: posX, posY: posY }))
      // dispatch(addPosY({ id: node.id, posY: posY }))
      dispatch(hideNode({ id: node.id, hidden: false }))

      if (e.target.value === 'none') {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        dispatch(addPosX({ id: node.id, posX: posX, posY: posY }))
        // dispatch(addPosY({ id: node.id, posY: posY }))
        dispatch(hideNode({ id: node.id, hidden: false }))
      } else if (node.type.toString() !== e.target.value.toString()) {
        const position = network.current.getPositions([node.id])
        const posX = position[`${node.id}`].x
        const posY = position[`${node.id}`].y
        dispatch(addPosX({ id: node.id, posX: posX, posY: posY }))
        // dispatch(addPosY({ id: node.id, posY: posY }))
        dispatch(hideNode({ id: node.id, hidden: true }))
      }
      // tempNodes.push(node)
    })

    // setNodes(tempNodes)
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
    var answer = window.confirm(t('areYouSureToStart'))
    if (answer) {
      navigate('/stakeholders')
    } else {
      return null
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 overflow-hidden">
        <ResultsNav
          confirmReset={confirmReset}
          downloadNetworkAsImage={downloadNetworkAsImage}
          handleEdgeFilter={handleEdgeFilter}
          handleNodeFilter={handleNodeFilter}
          relationsTypes={relationsTypes}
          stakeholdersTypes={stakeholdersTypes}
        />

        <div className="w-full my-t-4 mb-1 h-screen" ref={domNode} />
        <a id="canvasImg" download="Stakeholder-Network"></a>
        <div className="shadow-md mb-5 mr-5 fixed bottom-0 right-0">
          <div className="flex justify-center items-center gap-3">
            <h1 className="bg-primary bg-opacity-80 p-2 rounded-md text-white hover:bg-opacity-90 transition cursor-pointer">الإحصائيات</h1>
          </div>
        </div>
      </div>

      {toggleWarnModal && (
        <Modal isOpen={openWarnModal} closeModal={closeWarnModal} title={t('caution')}>
          <div className="">
            <h1 className="text-red-600 text-lg">{t('noDataToDraw')}</h1>
            <p>{t('pleaseFillSkAndRelations')}</p>
            <p onClick={() => navigate('/stakeholders')} className="text-primaryHover cursor-pointer hover:underline">
              {t('clickToGoBackToStakeholders')}
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Results
