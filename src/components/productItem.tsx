import { IProduct } from "@services/types.d"
import styles from '@styles/components/ProductItem.module.css'
import { Star, StarBorder } from '@mui/icons-material';
import Link from "next/link";

interface IProductItem {
  product: IProduct
}

export default function ProductItem({product}: IProductItem) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  return (
    <Link href={`/product/${product._id}`} className={styles.productItemContainer}>
      <div className={styles.productNameArea}>
        <div className={styles.productName}><strong>{product.name}</strong></div>
        <div className={styles.productPrice}>{formatter.format(product.price)}</div>
      </div>
      {product.favorite ? <Star htmlColor="#fecc32" /> : <StarBorder />}
    </Link>
  )
}