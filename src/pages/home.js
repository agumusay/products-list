import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = props => {
	const topProducts = [...props.productsData].sort((a, b) => b.price - a.price).slice(0, 4);
	return (
		<div className='home'>
			<div className='home-header'>
				<h2 className='home-header-title'>Welcome, visitor!</h2>
				<NavLink to='/products'>
					<button className='home-header-nav'>Go To Products</button>
				</NavLink>
			</div>

			<ul className='top-products'>
				{topProducts.map(({ id, name, price, slug, shortDescription, image }) => {
					return (
						<NavLink to={`/products/${slug}`} key={id}>
							<li className='top'>
								<img src={image} className='top-left'></img>
								<div className='top-right'>
									<h1 className='top-title'>{name}</h1>
									<p className='top-description'>{shortDescription}</p>
								</div>

								<div className='top-price'>{`$${price}`}</div>
							</li>
						</NavLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Home;
