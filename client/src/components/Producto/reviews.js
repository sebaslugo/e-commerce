import React, { useEffect, useState } from 'react'
import { Button, Icon, Header, Label, Form, TextArea, Feed, Rating, Comment } from 'semantic-ui-react'
import './reviews.css'
import { Typography } from '@material-ui/core/';
import { getReviews, postReview, putReview, deleteReview } from '../../redux/actions/reviews';
import { useDispatch, useSelector } from "react-redux";
import store from '../../redux/store/index';
import Swal from 'sweetalert2'

let id = JSON.parse(localStorage.getItem("idUser"));
let fullName = localStorage.getItem("fullName");

function Reviews({ productoId }) {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([])
  const [call, setCall] = useState(true)
  const [edit, setEdit] = useState(true)
  const [editConf, setEditConf] = useState(0)
  const [likes, setLikes] = useState()
  const [ratings, setRatings] = useState()
  const [description, setDescription] = useState()


  useEffect(() => {
    if (productoId && call) {
      dispatch(getReviews(productoId))
      store.subscribe(() => {
        setReviews(() => store.getState().reviews.data)
      })
      setCall(false);
    }
    if (!ratings) {
      let rating = 0;
      reviews.map((review) => {
        rating = review.rating + rating;
      })
      setRatings(Math.round(rating / reviews.length))
    }
    if (!likes) {
      let like = 0;
      reviews.map((review) => {
        like = review.likes + like;
      })
      setLikes(like)
    }
  })

  //// setea el comentario y sube el ranking si no existe algun comentario

  const handleChange = (e, { rating }) => {

    if (!rating) {
      setDescription(e.target.value)
    }
    if (rating) {
      setRatings(rating)
    }
  }

  /// sube el comentario y actualiza los reviews

  const handleSubmit = (e) => {

    if (description && ratings) {
      let comentario = {
        userId: id,
        description: description,
        rating: ratings
      }
      dispatch(postReview(productoId, comentario))
      Swal.fire({
        icon: 'info',
        title: 'Opinion registrada',
        text: 'Gracias por su opinion',
      })
      window.location.reload()
    } else if (!description) {
      Swal.fire({
        icon: 'info',
        title: 'Hey!',
        text: 'No olvides de escribir tu opinion',
      })
    } else if (!ratings) {
      Swal.fire({
        icon: 'infot',
        title: 'Hey!',
        text: 'No olvides de calificarnos!',
      })
    }


  }


  //// Edita la review

  const handleEdit = (review) => {
    let comentario = {
      userId: id,
      description: description,
      rating: ratings,
      id: review.id,
      user: { fullName: review.user.fullName }
    }
    if (!description) {
      comentario.description = review.description
    }
    else if (!ratings) {
      comentario.rating = review.rating
    }

    dispatch(putReview(productoId, review.id, comentario))
    setEditConf(0);
    setDescription();
    setRatings();
  }

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(productoId, reviewId))

  }

  const handleCancel = () => {
    setEditConf(0);
    setDescription();
  }

  return (

    <div className='review_todo'>

      <Comment.Group size='massive'>
        <Header as='h3' dividing>
          Opiniones
          </Header>
        {reviews.length > 0 && reviews.map((review, index) => (
          <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' />
            <Comment.Content>
              <Comment.Text>{review.user.fullName}</Comment.Text>
              <Comment.Content>
                <Rating defaultRating={review.rating} maxRating={5} disabled={editConf !== review.id ? true : false} onRate={handleChange} />
              </Comment.Content>
              {editConf !== review.id ?
                <Comment.Text>{review.description}</Comment.Text> :
                <Form onSubmit={() => handleEdit(review)}>
                  <TextArea rows={2} placeholder={review.description} onChange={handleChange} />
                  <Button type='submit'>Editar</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Form>}
              {editConf !== review.id && review.userId == id && <Comment.Actions>
                <Comment.Action onClick={() => setEditConf(review.id)}>Edit</Comment.Action>
                <Comment.Action onClick={() => handleDelete(review.id)}>Delete</Comment.Action>
              </Comment.Actions>}
            </Comment.Content>
          </Comment>
        ))}
        {editConf === 0 && id && <Form onSubmit={handleSubmit} id='review_form'>
          {description &&
            <div className='review_ranking'>
              <Typography variant="body1" className='producto_cantidad'>
                No te olvides de calificar el producto
              </Typography>
              <Rating defaultRating={1} maxRating={5} size='large' onRate={handleChange} />
            </div>

          }
          <TextArea rows={2} placeholder='Dejanos tu opinion acerca del producto' onChange={handleChange} />
          <Button type='submit'>Publicar</Button>
        </Form>}
      </Comment.Group>

    </div>

  )
}

export default Reviews