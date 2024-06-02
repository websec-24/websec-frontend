import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css';

const AddProducts = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            price,
            quantity,
        };
         
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(newProduct)
          });
          
          if (response.status === 200) {
            setName('');
            setDescription('');
            setQuantity(0);
            setPrice(0);
            navigate('/products');
            
          }
        }
        catch(error) {
          console.log(error);
        }
    };

    useEffect(() => {
      setIsFormValid(
        name !== '' && price > 0);
    }, [name, price])

    return (
        <div className="page-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                  <h1>Create new product</h1>
                </div>
                <div className="form-section">
                    <label>Name:</label>
                    <input className="input-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-section">
                    <label>Description:</label>
                    <textarea className="input-field" rows={5} cols={50}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label>Price:</label>
                    <input className="input-field"
                        type="number"
                        value={price}
                        onChange={(e) => {
                          let priceValue = parseInt(e.target.value);
                          if (priceValue < 0) {
                            priceValue = 0;
                          }
                          setPrice(priceValue);
                        }}
                    />
                </div>
                <div className="form-section">
                    <label>Quantity:</label>
                    <input className="input-field"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          let quantityValue = parseInt(e.target.value);
                          if (quantityValue < 0) {
                            quantityValue = 0;
                          }
                          setQuantity(quantityValue);
                        }}
                    />
                </div>
                <div className="form-section">
                  <div className="form-btn-container">
                    <button className="add-item-btn" type="submit" disabled={!isFormValid}>Create new product</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
    );
};

export default AddProducts;