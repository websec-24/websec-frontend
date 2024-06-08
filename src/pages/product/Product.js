import './Product.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductReviewForm from '../../components/productReview/productReviewForm/ProductReviewForm';
import testImage from '../../assets/products/sunglasses.jpg';

const Product = () => {
    const [product, setProduct] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        async function fetchProductWithReviews() {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}/reviews`);
            const data = await response.json();
            setProduct(data.data);
            }
            catch(error) {
            console.log(error);
            } 
      }

      fetchProductWithReviews();
  }, [productId])

    const handleSubmit = async (formData) => {
        try {
          const { title, text, isAnonymous, file } = formData;
    
          const formDataToSend = new FormData();
          formDataToSend.append('title', title);
          formDataToSend.append('text', text);
          formDataToSend.append('isAnonymous', isAnonymous);
          formDataToSend.append('file', file);
    
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}/reviews`, {
            credentials: 'include',
            method: 'POST',
            body: formDataToSend,
          });
    
          const data = await response.json();
          console.log(data);

        } catch (error) {
          console.error('Error submitting review:', error.message);
        }
      };


    return (
            <div>
                {product && (
                <div key={product.id} className='product-container'>
                    <h1 className='product-name'>{product.name}</h1>
                    <p className='product-description'>Description: {product.description}</p>
                    <p className='product-price'>Price: ${product.price}</p>
                    <div className="product-image-container">
                        <img src={testImage} alt="Product image" />
                    </div>
                </div>
            )}
            {product.product_reviews && product.product_reviews.map((productReview) => (
                <div key={productReview.id} className="review-container">
                    <h1>
                    {productReview.title}
                    </h1>
                    <p>
                    {productReview.text}
                    </p>
                    <div className="review-image-container">
                        <img src={`${process.env.REACT_APP_IMAGE_URL}/product-review-images/${productReview.imageUrl}`} alt="Review image" className="review-image" />
                    </div>
                </div>

            ))}
            <ProductReviewForm onSubmit={handleSubmit}></ProductReviewForm>
            </div>   
    )
}

export default Product
