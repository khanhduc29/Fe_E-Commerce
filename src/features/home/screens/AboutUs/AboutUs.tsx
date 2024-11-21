import { Avatar, Badge, Row, Typography } from 'antd';
import khanhduc from '../../../../assets/images/teams/khanhduc.jpg';
import diem from '../../../../assets/images/teams/diem.jpg';
import huy from '../../../../assets/images/teams/huy.jpg';
import hoang from '../../../../assets/images/teams/hoang.jpg';
import coach from '../../../../assets/images/teams/coach.jpg';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Row className="container" style={{ margin: '20px auto 58px' }}>
      <Row justify={'center'} align={'middle'} style={{ width: '100%' }}>
        <h1 style={{ letterSpacing: 4 }}>{t('team_members')}</h1>
      </Row>
      <Row
        justify={'center'}
        align={'middle'}
        style={{ width: '100%', flexDirection: 'column', rowGap: 50 }}
      >
        <Row style={{ flexDirection: 'column', gap: 8 }} align={'middle'} justify={'center'}>
          <Text type='danger' style={{ fontWeight: 600, fontSize: 16 }}>{t('instructor')}</Text>
          <Badge count={"!?"}>
            <Avatar
              size={200}
              src={coach}
            />
          </Badge>
        </Row>
        
        <Row style={{ gap: 50 }}>
          <Row style={{ flexDirection: 'column', gap: 8 }} align={'middle'} justify={'center'}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>{t('team_lead')}</Text>
            <Avatar
              size={200}
              src={khanhduc}
            />
          </Row>
          <Row style={{ flexDirection: 'column', gap: 8 }} align={'middle'} justify={'center'}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>{t('shop_system')}</Text>
            <Avatar
              size={200}
              src={hoang}
            />
          </Row>
          <Row style={{ flexDirection: 'column', gap: 8 }} align={'middle'} justify={'center'}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>{t('manage_system')}</Text>
            <Avatar
              size={200}
              src={huy}
            />
          </Row>
          <Row>
          <Row style={{ flexDirection: 'column', gap: 8 }} align={'middle'} justify={'center'}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>{t('recommend_system')}</Text>
            <Avatar
              size={200}
              src={diem}
            />
          </Row>
        </Row>
        </Row>
        
      </Row>
    </Row>
  );
};

export default AboutUs;
