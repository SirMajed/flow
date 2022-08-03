import React, { useEffect } from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline, IoEyeOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

import { addRelationArray, addRelationsTypes } from 'redux/slices/stakeholderSlice'
import CreateRelations from './CreateRelations'
import FormLayout from 'components/FormLayout'
import { v4 as uuidv4 } from 'uuid'
import NoStakeholdersAlert from './NoStakeholdersAlert'
import { Modal } from 'components/Modal'
import { t } from 'i18next'
const Index = () => {
  const [fileName, setFileName] = useState(null)
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const dispatch = useDispatch()
  const [openWarnModal, setOpenWarnModal] = useState(false)
  const { relations } = useSelector((s) => s.stakeholders)
  useEffect(() => {
    if (stakeholders && stakeholders.length <= 0) {
      setOpenWarnModal(true)
    }
  }, [])

  const closeWarnModal = () => {
    setOpenWarnModal(false)
  }
  const toggleWarnModal = () => {
    setOpenWarnModal(!openWarnModal)
  }

  const handleForce = (data, fileInfo) => {
    let arr = []
    var edgeSet = new Set()

    data.forEach((row) => {
      edgeSet.add(row.type)

      let length = 0 
      if (row.level !== 1){
          const x = arr.filter((item) => {
              return item.from === row.from && item.to === row.to && item.level === 1
          })
          length = x[0].length
      }
      else if (row.level === 1){
        length = Math.round(1500 / row.width)
      }
      var obj = {
        id: row.id || uuidv4(),
        from: row.from,
        to: row.to,
        arrows: 'to',
        label: row.label,
        width: row.width,
        color: row.color,
        type: row.type,
        level: row.level,
        hidden: row.level !== 1 ? true: false,
        length: length,
        title: `Test#1 •  </br> Test#2 • </br> Test#3 •`
        // physics: false,
        // smooth: {
        //   type: 'dynamic',
        //   forceDirection: 'none',
        //   roundness: 0
        // },
      }
      arr.push(obj)
    })
    dispatch(addRelationArray(arr))
    dispatch(addRelationsTypes(Array.from(edgeSet)))
    setFileName(fileInfo.name)
    // navigate('/relations/create')
    setCreateRelationsClicked(true)
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  const [createRelationsClicked, setCreateRelationsClicked] = useState(false)

  return (
    <>
      <FormLayout state="relations">
        {createRelationsClicked ? (
          <CreateRelations onPrevious={() => setCreateRelationsClicked(false)} />
        ) : (
          <div className="flex flex-col justify-center">
            <div className="my-6">
              <p className="text-xl font-medium text-gray-800">{t('chooseWay')}</p>
              <p className="font-normal text-gray-600">{t('relationsDescription')}</p>
            </div>

            <div className="flex flex-row items-center justify-center gap-10 mt-20">
              <label
                className="rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
                style={{ height: 'fit-content' }}
              >
                <p className="flex items-center gap-3">
                  {(relations && relations.length <= 0 && fileName) || t('uploadRelationsFile')}

                  <BsUpload size={22} />
                </p>
                <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
              </label>
              <p>{t('or')}</p>
              <div
                onClick={() => {
                  setCreateRelationsClicked(true)
                }}
                className="flex items-center gap-2 rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
              >
                {relations && relations.length >= 1 ? t('viewRelations') : t('createRelations')}
                {relations && relations.length >= 1 ? <IoEyeOutline size={25} /> : <IoCreateOutline size={25} />}
              </div>
            </div>
          </div>
        )}
      </FormLayout>

      {toggleWarnModal && (
        <Modal hideIcon isOpen={stakeholders && stakeholders.length >= 1 ? openWarnModal : true} title={t('caution')} closeModal={closeWarnModal}>
          <NoStakeholdersAlert />
        </Modal>
      )}
    </>
  )
}

export default Index
