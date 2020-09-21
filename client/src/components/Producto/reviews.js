import React, { useEffect, useState } from 'react'
import user from '../../imagenes/user.jpg'
import { Button, Icon, Label,Form, TextArea,Feed,Rating  } from 'semantic-ui-react'
import './reviews.css'
import {getReviews,postReview,putReview,deleteReview} from '../../redux/actions/reviews';
import { useDispatch,useSelector } from "react-redux";
import store from '../../redux/store/index';

let id = JSON.parse(localStorage.getItem("idUser"));  

function Reviews  ({productoId})  {
  const dispatch = useDispatch();
  const [reviews,setReviews] = useState([])
  const [call, setCall] = useState(true)
  const [edit,setEdit] = useState(true)
  const [editConf,setEditConf] = useState(0)
  const [likes,setLikes] = useState()
  const[ratings,setRatings] = useState()
  const[description,setDescription] = useState()
   
  
  useEffect(()=> {
      if(productoId && call){
        dispatch(getReviews(productoId))
        store.subscribe(() => {
        setReviews(() => store.getState().reviews.data)
        })
        setCall(false);        
      } 
      if(!ratings){        
        let rating = 0;
        reviews.map((review) => {
          rating = review.rating + rating;
        })
        setRatings(Math.round(rating/reviews.length))
      }  
      if(!likes){        
        let like = 0;
        reviews.map((review) => {
          like = review.likes + like;
        })
        setLikes(like)
      }             
  })

  //// setea el comentario y sube el ranking si no existe algun comentario

  const handleChange = (e,{rating}) => {
    
    if(!rating){
      setDescription(e.target.value)
    }
    if(rating){ 
      setCall(true);      
      setRatings(rating)
      let comentario={
        userId:1,
        rating:rating
      }
      dispatch(postReview(productoId,comentario,id))
           
    }  
  }

   /// sube el comentario y actualiza los reviews

  const handleSubmit = (e) => {
    
    let comentario = {
       userId:id,
       description:description,
    }
    
    dispatch(postReview(productoId,comentario))
    setCall(true); 
    
    
  }

  //// sube y setea los likes

  const handleLike = () => {
    setCall(true);
    let comentario = {
      userId:id,
      likes:1
    }
    setLikes(likes + 1)
    dispatch(postReview(productoId,comentario,id))
    
  }

  //// Edita la review

  const handleEdit = (reviewId) => {
    let comentario = {
      userId:id,
      description:description,
    }
    dispatch(putReview(productoId,reviewId,comentario,id))
    setEditConf(0);
    setCall(true);
  }

  const handleDelete  = (reviewId) => {
    dispatch(deleteReview(productoId,reviewId))
    setCall(true);
  }
  console.log(id)
  console.log(reviews)
  return (
    <Feed>
      <div>
      <Button as='div' labelPosition='right'>
        <Button color='red' onClick={handleLike}>
          <Icon name='heart' />
          Like
        </Button>
        <Label as='a' basic color='red' pointing='left'>
          {likes}
        </Label>
      </Button>
      <Button as='div' labelPosition='right'>
        <Button basic color='blue'>
          <Icon name='fork' />
          Share
        </Button>
      </Button>
      </div>
      <hr/>
      <Rating maxRating={5} defaultRating={5} onRate={handleChange} icon='star' size='massive' /> 
      <br/>      
      {ratings ? 
        <label>ranking: 
          <Rating maxRating={5} defaultRating={ratings}  icon='star' size='mini' disabled={true}/> 
        </label> : 
        <h1></h1>}
      <hr/>
      {reviews.length>0 ? reviews.map((review,index) => (
          review.description &&
          <Feed.Event key = {index}>
          <Feed.Label>
            <Icon name='user'/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary className = 'review-summary'>
              <a>{review.user.fullName}</a> 
              <div className='review-button'>
                {review.userId == id && <Button icon onClick={() => setEditConf(review.id)}>
                  <Icon name='edit' size = 'small' />
                </Button>}
                {review.userId == id && <Button icon onClick = {() => handleDelete(review.id)}>
                  <Icon name='delete' size = 'small'/>
                </Button>}
              </div>          
            </Feed.Summary>
            {editConf !== review.id ? 
              <Feed.Extra text>
                {review.description}
              </Feed.Extra> : 
              <Form onSubmit={() => handleEdit(review.id)}>
                <TextArea rows={2} placeholder={review.description} onChange={handleChange}/>
                <Button type='submit'>Editar</Button>
              </Form> }        
          </Feed.Content>
          </Feed.Event>       
        )): <label>Sin comentarios</label>}
      
      <hr/>
       <Form onSubmit={handleSubmit}>
          <TextArea rows={2} placeholder='Dejanos tu opinion acerca del producto'  onChange={handleChange}/>
          <Button type='submit'>Publicar</Button>
        </Form> 
    </Feed>
  ) 
}

export default Reviews