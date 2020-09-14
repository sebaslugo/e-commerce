import React from 'react'
import user from '../../imagenes/user.jpg'
import { Button, Icon, Label,Form, TextArea,Feed,Rating  } from 'semantic-ui-react'

const Reviews = () => (
  <Feed>
     <div>
    <Button as='div' labelPosition='right'>
      <Button color='red'>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>
        2,048
      </Label>
    </Button>
    <Button as='div' labelPosition='right'>
      <Button basic color='blue'>
        <Icon name='fork' />
        Fork
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        2,048
      </Label>
    </Button>
    </div>
    <hr/>
    <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
    <Feed.Event>
      <Feed.Label image = {user} />
      <Feed.Content>
        <Feed.Date>3 days ago</Feed.Date>
        <Feed.Summary>
          <a>Laura Faucet</a> 
        </Feed.Summary>
        <Feed.Extra text>
          Have you seen what's going on in Israel? Can you believe it.
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
    <Form>
        <TextArea rows={2} placeholder='Dejanos tu opinion acerca del producto' />
    </Form>
  </Feed>
)

export default Reviews