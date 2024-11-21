import { useTranslation } from 'react-i18next';
import Payment from "../../../../components/Payment/Payment";

const PaymentPage = () => {
  const { t } = useTranslation();
    
  return (
    <Payment title={t('payment')} />
  )
}

export default PaymentPage