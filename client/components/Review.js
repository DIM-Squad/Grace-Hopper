import React from 'react'
import {Item, Rating, Button} from 'semantic-ui-react'

const Review = props => {
  return (
    <Item.Group>
      <Item>
        <Item.Image
          size="tiny"
          src="https://semantic-ui.com/images/avatar2/large/elyse.png"
        />
        <Item.Content>
          <Item.Header>{props.review.title}</Item.Header>
          {props.isSelfOrAdmin && (
            <Button onClick={props.deleteReview} negative>
              Delete Review
            </Button>
          )}
          <Item.Meta>
            <Rating
              icon="star"
              defaultRating={props.review.rating}
              maxRating={5}
              disabled
            />
          </Item.Meta>
          <Item.Description>{props.review.description} </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default Review
