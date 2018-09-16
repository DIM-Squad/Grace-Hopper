import {Card, Button, Image, Icon, Divider} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {formatPrice} from '../utils/formatPrice'

class ProductCollection extends Component {
  componentDidMount = () => {
    let filterType, filterId
    if (this.props.featured) {
      filterType = 'featured'
      filterId = 'true'
    } else {
      ;({filterType, filterId} = this.props.match.params)
    }
    this.props.fetchProducts(filterType, filterId)
  }

  addToCart = () => {
    console.log('should add to cart')
  }

  goToProduct = id => {
    this.props.history.push(`/products/${id}`)
  }

  render() {
    return (
      <Fragment>
        <Divider hidden />
        <Card.Group stackable centered>
          {this.props.products.map(product => (
            <Card key={product.id}>
              <Card.Content>
                <Image size="medium" src={product.imageUrl} />
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>{product.artist.name}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Card.Description>
                  {formatPrice(product.price)}
                </Card.Description>
                <Button
                  primary
                  floated="right"
                  onClick={() => this.goToProduct(product.id)}
                >
                  More details
                </Button>
                <Button
                  primary
                  floated="left"
                  disabled={product.quantity === 0}
                  onClick={this.addToCart}
                >
                  {product.quantity !== 0 ? (
                    <Icon name="shopping cart" />
                  ) : (
                    'Out of stock'
                  )}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({products: state.products})
const mapDispatchToProps = dispatch => ({
  fetchProducts: (filterType, filterId) =>
    dispatch(fetchProducts(filterType, filterId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCollection)
)
