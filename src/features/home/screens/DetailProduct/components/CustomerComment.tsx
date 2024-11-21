/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { Button, Divider, message, Rate, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { api } from '../../../../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

export type RatingItemType = {
  star: number;
  postedBy: string;
  comment: string;
};

interface Props {
  star: number | undefined;
  productId: string | undefined;
  productCmts: RatingItemType[] | undefined;
}

const CustomerComment = ({ star, productId, productCmts }: Props) => {
  const { t } = useTranslation();
  const [isUserComment, setIsUserComment] = useState(false);
  const [starVote, setStarVote] = useState(3);
  const [comment, setComment] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  console.log('star', star);

  const { userId } = useSelector((state: RootState) => state.auth);

  const handleSubmitComment = () => {
    if (!productCmts?.find((rt) => rt.postedBy === userId)) {
      api
        .put('/product/ratings', {
          pid: productId,
          star: starVote,
          comment,
        })
        .then(() => {
          messageApi.open({
            type: 'success',
            style: { fontFamily: 'sans-serif' },
            content: t('review_success'),
          });
        })
        .catch(() => {
          messageApi.open({
            type: 'error',
            style: { fontFamily: 'sans-serif' },
            content: t('review_failure'),
          });
        })
        .finally(() => {
          setIsUserComment(false);
          setComment('');
          setStarVote(3);
        });
    }
  };

  return (
    <Box sx={{ marginTop: '90px' }}>
      <Typography
        style={{
          fontSize: '22px',
          lineHeight: '26px',
          color: '#333',
        }}
      >
        {t('review')}
      </Typography>

      <Divider
        style={{
          backgroundColor: '#636363',
          width: 30,
          minWidth: 0,
          margin: '10px 0',
        }}
      />
      <Row style={{ flexDirection: 'column' }}>
        <Row
          style={{ width: '100%', marginBottom: 24 }}
          align={'middle'}
          justify={'center'}
        >
          <Text style={{ color: '#000', fontWeight: 500, fontSize: 20 }}>
            {t('customer_reviews')}
          </Text>
        </Row>
        <Row
          style={{ width: '100%', columnGap: 48 }}
          align={'middle'}
          justify={'center'}
        >
          <Row style={{ flexDirection: 'column' }}>
            {[undefined, null, 0].includes(star) ? (
              <Text style={{ fontFamily: 'sans-serif', marginBottom: 4 }}>{t('be_first_to_review')}</Text>
            ) : (
              <Text style={{ fontFamily: 'sans-serif', marginBottom: 4 }}>{t('overall_rating')}</Text>
            )}
            <Rate style={{}} disabled allowHalf value={star} />
          </Row>
          <Divider type="vertical" style={{ height: 60 }} />
          <Row>
            <Button
              color="default"
              variant="solid"
              style={{
                height: 40,
                minWidth: 240,
                padding: '10px 20px',
                borderRadius: 0,
              }}
              onClick={() => setIsUserComment(!isUserComment)}
            >
              <Text style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>
                {isUserComment ? t('cancel_review') : t('write_review')}
              </Text>
            </Button>
          </Row>
          {contextHolder}
          {isUserComment &&
            !productCmts?.find((rt) => rt.postedBy === userId) && (
              <>
                <Divider />
                <Row
                  style={{ flexDirection: 'column', gap: 12 }}
                  align={'middle'}
                  justify={'center'}
                >
                  <Text
                    style={{ fontWeight: 900, fontSize: 20, color: '#636363' }}
                  >
                    {t('write_review')}
                  </Text>
                  <Text style={{ marginTop: 12 }}>{t('rating')}</Text>
                  <Rate
                    allowHalf
                    value={starVote}
                    onChange={(val) => setStarVote(val)}
                  />
                  <Text style={{ marginTop: 12 }}>{t('review')}</Text>
                  <TextArea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('review_placeholder')}
                    style={{ width: 500, fontFamily: 'sans-serif' }}
                  />
                  <Row style={{ gap: 24, marginTop: 12 }}>
                    <Button
                      color="default"
                      variant="outlined"
                      style={{
                        height: 40,
                        minWidth: 240,
                        padding: '10px 20px',
                        borderRadius: 0,
                      }}
                      onClick={() => setIsUserComment(!isUserComment)}
                    >
                      <Text
                        style={{ fontWeight: 900, fontSize: 16, color: '#000' }}
                      >
                        {t('cancel_review')}
                      </Text>
                    </Button>
                    <Button
                      color="default"
                      variant="solid"
                      style={{
                        height: 40,
                        minWidth: 240,
                        padding: '10px 20px',
                        borderRadius: 0,
                      }}
                      onClick={() => handleSubmitComment()}
                    >
                      <Text
                        style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}
                      >
                        {t('submit_review')}
                      </Text>
                    </Button>
                  </Row>
                </Row>
              </>
            )}
        </Row>
      </Row>
    </Box>
  );
};

export default CustomerComment;
