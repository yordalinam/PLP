import './Product.css';
export function Product(props) {

    return <div className="singleProductContainer">
        <img className='imageProduct' src={props.imageLink} alt="" />
        <h3>{props.productName}</h3>
        <p>{props.productDescription}</p>

        <div className="lowerProductRow">
            <span>{props.price} $</span>
            <span>{props.rating}</span>
            <button onClick={
                () => {
                    props.addToCart(props.productName)
                }
            }>Add To Cart</button>
        </div>
    </div >
}