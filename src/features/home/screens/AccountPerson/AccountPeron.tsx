import { useTranslation } from 'react-i18next';

const AccountPeron = () => {
  const { t } = useTranslation();
  return (
    <div>{t('account_person')}</div>
  )
}

export default AccountPeron