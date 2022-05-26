import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRelationArray, addStakeholderArray } from 'redux/slices/stakeholderSlice'
import Graph from 'react-graph-vis'

const Results = () => {
  const dispatch = useDispatch()
  const stakeholders = [
    { label: 'test1', type: 's1', id: 1 },
    { label: 'test2', type: 's2', id: 2 },
    { label: 'test3', type: 's3', id: 3 },
    { label: 'test4', type: 's4', id: 4 },
  ]
  const relations = [
    {
      from: 1,
      to: 2,
    },
    {
      from: 1,
      to: 3,
    },
    {
      from: 'test2',
      to: 'test1',
      rel: 'test relation#2 long text',
      weight: 0.3,
      reltype: 2,
      relcolor: 'blue',
    },
    {
      from: 'test3',
      to: 'test2',
      rel: 'test relation#3 long long text',
      weight: 0.4,
      reltype: 2,
      relcolor: 'black',
    },
  ]

  const graph = {
    nodes: stakeholders,
    edges: relations,
  }

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  }

  return (
    <>
      <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12 md:w-2/3 lg:w-2/5">
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">النتائج</h1>

          <div className="w-full border my-10">
            <Graph
              graph={graph}
              options={options}
              getNetwork={(network) => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Results
