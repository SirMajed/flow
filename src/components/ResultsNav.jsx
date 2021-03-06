import { t } from 'i18next'
import React from 'react'
import { MdFileDownload } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Select from './Select'

const ResultsNav = ({ confirmReset, downloadNetworkAsImage, stakeholdersTypes, handleEdgeFilter, handleNodeFilter, relationsTypes }) => {
  const navigate = useNavigate()
  const { relations } = useSelector((s) => s.stakeholders)
  const { language } = useSelector((s) => s.ui)
  return (
    <div className=" md:flex justify-between items-center bg-zinc-50 shadow-md sticky top-0 w-full py-3 px-8">
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={() => {
            if (relations && relations.length <= 0) {
              navigate('/stakeholders')
            } else {
              navigate('/relations')
            }
          }}
          className="flex flex-row-reverse items-center cursor-pointer text-primary"
        >
          <p className="text-primary text-sm ">{t('back')}</p>
          {language === 'ar' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </div>

        <Select fullWidth={false} itemsWithNoObjects items={stakeholdersTypes} onChange={handleNodeFilter} OptionDefaultValue={t('filterStakeholders')} />
        <Select fullWidth={false} itemsWithNoObjects items={relationsTypes} onChange={handleEdgeFilter} OptionDefaultValue={t('filterRelations')} />
      </div>

      <h1 className="text-3xl text-primary font-medium">{t('finalDiagram')}</h1>

      <div className="flex flex-row gap-4">
        <Button classes="bg-transparent text-primary border border-primary hover:text-white" text={t('startOver')} onClick={confirmReset} />
        <Button icon={<MdFileDownload color="white" size={20} />} text={t('download')} onClick={downloadNetworkAsImage} />
      </div>
    </div>
  )
}

export default ResultsNav
