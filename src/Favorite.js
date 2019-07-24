import React, { Component } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Products from './Products';
import Sorting from './Sorting';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Favorite extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state ={
      favorite: localStorage.favorite ? JSON.parse(localStorage.favorite) : [],
      products: {}
    }
  }
  
  componentWillMount() {
    this._isMounted = true;
    
    this.props.fetchProductsByParams([{key:'id', params: this.state.favorite}])
      .then(res => {
        if (this._isMounted) {
          this.setState({products: res})
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    //console.log(this.props)
    return this.state.favorite.length ? (
      <React.Fragment>
        <Breadcrumbs {...this.props} categoryName={'Избранное'} />    
        <main className="product-catalogue product-catalogue_favorite">          
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2><span className="amount amount_favorite"> {this.state.favorite.length} товаров</span>
            </div>
            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>
              <Sorting {...this.props} />
            </div>
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite" style={{width: '1200px'}}>
            <Products products={this.state.products.data} fetchSizes={this.props.fetchSizes} handleFavorite={(id) => {
              this.props.handleFavorite(id);
              this.setState({favorite: localStorage.favorite ? JSON.parse(localStorage.favorite) : []})
            }} />
          </section>
          <Pagination {...this.props} products={this.state.products} />
        </main>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Breadcrumbs categoryName={'Избранное'} />
        <main className="product-catalogue product-catalogue_favorite" style={{minHeight: '600px'}}>
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном пока ничего нет</h2>
            </div>
          </section>
        </main>
      </React.Fragment>
    )
  }
}

Favorite.propTypes = {
  fetchProductsByParams: PropTypes.func.isRequired,
  fetchSizes: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
}

export default Favorite;