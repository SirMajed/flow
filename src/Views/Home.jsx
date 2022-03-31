import React, { useEffect, useRef, useState } from 'react'
import { Network } from 'vis-network/standalone/esm/vis-network'
import { DataSet } from 'vis-data'
import { MdFileDownload, MdClear, MdArrowForward } from 'react-icons/md'
import Papa from 'papaparse'
import TitleBar from '../components/TitleBar'
import isElectron from 'is-electron'
import whiteLogo from '../assets/images/whiteLogo.png'
import { BsDiagram2 } from 'react-icons/bs'
import Button from '../components/Button'
import InputFile from '../components/InputFile'
const Home = () => {
  // A reference to the div rendered by this component
  const domNode = useRef(null)
  const inputRefOne = useRef()
  const inputRefTwo = useRef()

  const [file1, setFile1] = useState(null)

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [nodeType, setNodeType] = useState([])
  const [edgesType, setEdgesType] = useState([])


  // A reference to the vis network instance
  const network = useRef(null)
  var ss = 'box'
  var ww = { id: 1, label: 'Node 1', shape: ss }

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
      font : {
        size : 20,
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

        forceDirection: 'none'

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

  useEffect(() => {
    // var nod = [
    //   { id: 1, label: 'Node 1', x: null, y: null },
    //   { id: 2, label: 'Node 2', x: null, y: null },
    //   { id: 3, label: 'Node 3', x: null, y: null },
    //   { id: 4, label: 'Node 4', x: null, y: null },
    //   { id: 5, label: 'Node 5', x: null, y: null }
    // ];
    // var edg = [
    //   { from: 1, to: 3 },
    //   { from: 1, to: 2 },
    //   { from: 2, to: 4 },
    //   { from: 2, to: 5 }
    // ];
    if(network.current){
      network.current.setOptions({physics:false})
    }
    network.current = network.currnet || new Network(domNode.current, data, options)
    network.current.on('stabilizationIterationsDone', function () {
      this.setOptions({ physics: false })
    })
    // console.log(network.current)

    network.current.on("click", function (n) {
      console.log(n);
      // console.log(n);
      // console.log(n.nodes.length);

      var tempNodes = []
      nodes.forEach(e => {
        

        const position = network.current.getPositions([e.id])
        const posX = position[`${e.id}`].x
        const posY = position[`${e.id}`].y
        e.x = posX
        e.y = posY
        // e.hidden = false
      
      tempNodes.push(e)
    })
      if (network.current && n.nodes.length > 0) {
        var nnn = network.current.getConnectedNodes(n.nodes[0])

        nnn.push(n.nodes[0])
        
         tempNodes = []
        nodes.forEach(e => {
          if(!nnn.includes(e.id)){

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


      if(n.items.length === 0 && n.nodes.length === 0 && n.edges.length === 0){
         tempNodes = []
        nodes.forEach(e => {
        

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

  const handleFileOne = (e) => {
    const colorList = ["#fc8d8d", "#f8ffc7", "#ededed", "#34eb9b"] // [red, yellow, grey, green]
    const file = e.target.files[0]
    var typesSet = new Set()
    var types = [];
    var dict = {};
  
    setFile1(file)
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          var n = []
          results.data.forEach((row) => {
              typesSet.add(row.TYPE)
            })
            
            types = Array.from(typesSet)
            types.forEach((type, index) => {
              dict[type] = colorList[index];  
            })
          setNodeType(types)
          console.log(types);
          results.data.forEach((row) => {
            var obj = {
              id: row.NAME,
              label: row.NAME,
              shape: 'box',
              type: row.TYPE
            }
            if(Object.keys(dict).includes(row.TYPE)){
              obj.color = dict[row.TYPE]
            }
            n.push(obj)
        })
        console.log(n);
        setNodes(n)
      }

    })
  }
}
  const handleFileTwo = (e) => {
    const file = e.target.files[0]
    if (file) {

      var e = []
      var edgeSet = new Set()
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          results.data.forEach((row) => { 
            edgeSet.add(row.relType)
            var edgeObj = {
              from: row.FROM,
              to: row.TO,
              arrows: 'to',
              label: row.REL,
              width: (row.Weight * 10) / 1.2 ,
              color: row.RELCOLOR,
              type: row.relType
            }
            e.push(edgeObj)
          })
          setEdgesType(Array.from(edgeSet))
          setEdges(e)
        },
      })

    }
}

 

  const handleClear = () => {
    inputRefOne.current.value = ''
    inputRefTwo.current.value = ''
    setEdges([])
    setNodes([])
    setEdgesType([])
    setNodeType([])
  }

  const handleNodeFilter = (e) => {
      const tempNodes = []
        nodes.forEach(node => {

          const position = network.current.getPositions([node.id])
          const posX = position[`${node.id}`].x
          const posY = position[`${node.id}`].y
          node.x = posX
          node.y = posY
          node.hidden = false
          if(e.target.value === 'none'){
            const position = network.current.getPositions([node.id])
            const posX = position[`${node.id}`].x
            const posY = position[`${node.id}`].y
            node.x = posX
            node.y = posY
            node.hidden = false
          }
          else if(node.type !== e.target.value){
            const position = network.current.getPositions([node.id])
            const posX = position[`${node.id}`].x
            const posY = position[`${node.id}`].y
            node.x = posX
            node.y = posY
            node.hidden = true
          }
          tempNodes.push(node)
        })
      
        setNodes(tempNodes)
  }

  const handleEdgeFilter = (e) => {
    const tempEdges = []
      edges.forEach(edge => {


        edge.hidden = false
        if(e.target.value === 'none'){
    
          edge.hidden = false
        }
        else if(edge.type !== e.target.value){
       
          edge.hidden = true
        }
        tempEdges.push(edge)
      })
    
      setEdges(tempEdges)
}

  function scrollTo(e) {
    const divElement = document.getElementById('main')
    divElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

  }
  function scrollToCont() {
    const divElement = document.getElementById('cont')
    divElement.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadNetworkAsImage = () => {
    document.getElementById('canvasImg').click()
  }

  return (
    <>
      {isElectron() && <TitleBar />}

      <div className="flex flex-col justify-center h-screen bg-gray-100">
        <div className="overflow-y-hidden ">
          <div className="mx-auto container py-12 px-4 ">
            <div className="w-full flex justify-center">
              <div className="w-full md:w-11/12 xl:w-10/12 bg-primary md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 shadow-md">
                <div>
                  <div className="flex flex-wrap items-center md:flex-row flex-col-reverse"  >
                    <div className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4" >
                      <div> 
                        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-10/12 text-white font-black leading-6 lg:leading-10 md:text-left text-center">
                          Stakeholder Diagram
                        </h1>
                        <p className="text-lg md:text-base xl:text-xl font-light text-gray-200 xl:leading-normal pt-2">
                          You can upload your files (.csv,.xlsx,.xls) to generate the diagram
                        </p>
                      </div>
                      <button
                        onClick={scrollTo}
                        className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-black text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
                      >
                        Get started
                      </button>
                      <button
                        onClick={scrollToCont}
                        className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-black text-sm lg:text-lg xl:text-xl hover:bg-opacity-90 ml-5  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
                      >
                        Contributors
                      </button>
                    </div>
                    <div className="md:w-1/3 w-2/3">
                      <img className="" src={whiteLogo} alt="image" />
                      {/* <img className="rounded-lg opacity-40" src={Wallpaper} alt="image" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around h-screen" id="main">
        <div className="flex-col">
          <div className="mt-4 mb-2">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-left text-center">
              Upload your files
            </h1>
            <p className="text-lg md:text-base xl:text-xl font-light text-gray-800 xl:leading-normal pt-1">You can only upload (.csv,.xlsx,.xls) files</p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <InputFile label="1. Upload stakeholders file" re={inputRefOne} onChange={handleFileOne} />
            </div>

            <div>
              <InputFile label="2. Upload edge matrix file" re={inputRefTwo} onChange={handleFileTwo} />
            </div>

          
          </div>

        </div>

        <div className="flex flex-col items-center h-full w-full mt-4">
          <div className="w-11/12 h-5/6 my-t-4 mb-1 relative border-2 border-dashed">

              {/* <div className='absolute top-0 right-0 z-10 '> */}
                
                <select id="nodeType" className='absolute top-0 right-0 z-10 bg-primary gap-2 px-2 py-1.5 my-1 mx-2 text-white' onChange={handleNodeFilter}>
                  <option selected value="none">Stakeholders filter</option>
                  {nodeType.map((t) => <option value={t}>{t}</option>)}
                </select>

              {/* </div> */}
              
               <select id="relationType" className='absolute top-0 right-20 z-10 bg-primary gap-2 px-5 py-1.5 my-1 mr-28 text-white'  onChange={handleEdgeFilter}>
               <option selected value="none">Relation filter</option>
               {edgesType.map((t) => <option value={t}>{t}</option>)}  
              </select>
              <div id="test"  className="w-full h-full my-t-4 mb-1" ref={domNode}/> 
          
          </div>
          
          
          <div id="fff" className="flex items-center gap-2">
          {nodes && nodes.length >= 1 && edges && edges.length >= 1 && <Button icon={<MdClear color="white" size={20} />} text="Reset" onClick={handleClear} />}

          <Button icon={<MdFileDownload color="white" size={20} />} text="Export" onClick={downloadNetworkAsImage} />
          </div>
        </div>
      </div>

      <a id="canvasImg" download="filename"></a>
      <div id="cont" className="flex flex-col justify-top h-screen bg-gray-100">
       <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-dark font-black leading-6 lg:leading-10 md:text-center text-center"> Contributors</h1>
      </div>
    </>
  )
}
export default Home