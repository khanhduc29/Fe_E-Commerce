import { Grid2 } from "@mui/material"
import DetailItemText from "./components/DetailItemText"
import ReturnTerm from "./components/ReturnTerm"
import ShippingTerms from "./components/ShippingTerms"
import InfoAndAction from "./InfoAndAction/InfoAndAction"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProductItemType } from "../../types/product.types"
import { apiNotToken } from "../../../../api/api"
import CustomerComment from "./components/CustomerComment"
import { useAppSelector } from "../../../../store/store"

const DetailProduct = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<ProductItemType | null>(null)
  const userInfo = useAppSelector(state => state.auth.userId)
  console.log(userInfo)
    useEffect(() => {
      // apiNotToken.get(`/product/?slug=${slug}`).then((res) => {
      //   console.log(res.data.products?.[0]);

      //   setProduct(res.data.products?.[0])
      // })
      apiNotToken.get(`/product/getDetail/${slug}`,
        {
          params: {
            clickBy: userInfo ? userInfo : null
          }
        }
      ).then((res) => {
        console.log(res.data.productData);
        setProduct(res.data.productData)
      })
    }, [slug])

  return (
    <Grid2 container className='container' sx={{ m: '20px auto 58px' }}>
      {product && <InfoAndAction product={product} />}
      <Grid2 container size={12}>
        <Grid2 size={12}>
          <DetailItemText product={product} />
        </Grid2>
        <Grid2 size={12}>
          <CustomerComment star={product?.totalRatings} productId={product?.id} productCmts={product?.ratings} />
        </Grid2>
        <Grid2 size={12}>
          <ShippingTerms />
        </Grid2>
        <Grid2 size={12}>
          <ReturnTerm />
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default DetailProduct