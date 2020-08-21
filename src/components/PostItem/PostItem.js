import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    width:'100%',
    marginTop: 20
  },
  root: {
    maxWidth: 345,
    margin:'auto',
  },
  media: {
    height: 500,
  },
});

// const add = ()=>{
//     console.log(getBoundingClientRect)
// }


const PostItem = ({
    book_image,
    title,
    description,
    book_image_height,
    book_image_width,
    price,
    amazon_product_url
}) => {
    const classes = useStyles();
    

    return (
        <div className={classes.container}>
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book_image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Prise:{price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <a href={amazon_product_url}>buy</a>
          </Button>
        </CardActions>
      </Card> 
      </div>
      );
  

}

export default PostItem;
