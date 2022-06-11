import { t } from 'i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoStakeholdersAlert = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-red-600 text-lg">{t('youCannotCreateRelations')}</h1>
      <a onClick={() => navigate('/stakeholders')} className="text-primaryHover cursor-pointer hover:underline">
       {t('clickToGoBackToStakeholders')}
      </a>
    </div>
  )
}

export default NoStakeholdersAlert
