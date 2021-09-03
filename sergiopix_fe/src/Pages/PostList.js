import axios from 'axios';
import { API_BASE_URL, MEDIA_BASE_URL } from '../Config';
import Loading from '../Components/Loading';
import { Header, Grid, Pagination, Container, Segment, Image, Divider, Table } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import TagFilter from '../Components/Header';


function ImageViewer() {

}

function PostItem(props) {
    const imageClick = (event) => console.log(event);
    return (
      <Grid id={props.post.id}
        style={{ padding: '45px', paddingTop: '15px', paddingBottom: '15px', borderBottom: '1px solid #e7e8ec'}}
      >
        <Grid.Row>
          <Header as='h3' floated='center'>
            {props.post.title}
          </Header>
        </Grid.Row>
        <Grid.Row>
            {props.post.shooted_at}<br/>
            {props.post.shooted_place}<br/>
            {props.post.content}<br/>
        </Grid.Row>
        <Grid.Row>
          <div>
            {
              props.post.images.map((img, idx) =>
                <Image
                  id={props.post.title + idx}
                  style={{width: '200px', margin: '4px', display: 'inline'}}
                  src={`${MEDIA_BASE_URL}/${img}`}
                  onClick={(e) => window.open(e.target.src)}
                />
              )
            }
          </div>
        </Grid.Row>
      </Grid>
    )

}

export default function PostList() {
  const [loading, setLoading] = useState(true)
  const [Posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/list/`)
      .then(result => {
        setPosts(result.data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <div style={{
        marginLeft: '250px', marginRight: '250px', marginTop: '10px', marginBottom: '10px',
        paddingLeft: '25px', paddingRight: '25px', paddingTop: '10px',
        backgroundColor: 'white', border: '1px solid #e7e8ec'
        }}
      >
        <TagFilter/>
        {
          Posts.map((p) =>
            <PostItem post={p} />
          )
        }
        <Segment textAlign='center' style={{border: 'None'}}>
          <Pagination defaultActivePage={1} firstItem={null} lastItem={null} pointing secondary totalPages={33} />)
        </Segment>
      </div>
    );
  }
}
