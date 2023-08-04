import { useState } from 'react'
import './Navigation.css'

export function Navigation(props) {
    const [category, setCategory] = useState('Socks')
    const [description, setDescription] = useState('Funny Socks To Make You Smile ✨')


    return <>
        <nav className="navigation">
            <div className="navigationRow">
                <div className='nameAndLogo'>
                    <span> The Colors of You</span>
                    <img className="logo" src="./logo.svg" alt="" />
                </div>




                <div className="navigationMenu">
                    <a className={category === 'Socks' ? 'triggered' : ''} onClick={() => { props.catSelected('Socks'); setCategory('Socks'); { setDescription('Funny Socks To Make You Smile ✨') } }} href="#">SOCKS</a>
                    <a className={category === 'Shoes' ? 'triggered' : ''} onClick={() => { props.catSelected('Shoes'); setCategory('Shoes'); { setDescription('From Ordinary to Classy Shoes ✨') } }} href="#">SHOES</a>
                    <a className={category === 'Bags' ? 'triggered' : ''} onClick={() => { props.catSelected('Bags'); setCategory('Bags'); { setDescription('Beautiful Bags for Special Occasions ✨') } }} href="#">BAGS</a>
                </div>
            </div>
        </nav>
        <div className="categoryRow">

            <select onChange={props.sortingMethod} className="sortingText">
                <option value="priceDesc">Price⬆️</option>
                <option value="priceAsc">Price⬇️</option>
                <option value="nameDesc">Name a-z</option>
                <option value="nameAsc">Name z-a</option>
            </select>

            <span className="categoryText">{category}</span>
            <span className='cat_Description'>{description}</span>
        </div>
    </>
}
