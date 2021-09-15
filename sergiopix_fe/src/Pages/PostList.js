import axios from 'axios';
import { API_BASE_URL, MEDIA_BASE_URL } from '../Config';
import Loading from '../Components/Loading';
import { Header, Grid, Pagination, Segment, Image, } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import TagFilter from '../Components/Header';
import { useHistory } from 'react-router-dom';


function PostItem(props) {
    const history = useHistory();
    const handleClick = () => {
      history.push(`/post/${props.post.id}`);
    }

    return (
      <Grid id={props.post.id}
        style={{ padding: '45px', paddingTop: '15px', paddingBottom: '15px', borderBottom: '1px solid #e7e8ec'}}
      >
        <Grid.Row>
          <Header as='h3' floated='center' onClick={handleClick} style={{cursor: 'pointer'}}>
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
                  style={{height: '200px', margin: '4px', display: 'inline', cursor: 'pointer'}}
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

const PostListSegment = function(props) {
  const { posts, loading, setLoading } = props;

  useEffect(() => {
    setLoading(false);
  }, [posts, setLoading]);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <div>
        { posts.map((p) => <PostItem post={p} />) }
      </div>
    )
  }
}

function fetchData(page) {
  return axios.get(`${API_BASE_URL}/posts/list/?page=${page}`)
}

export default function PostList() {
  const [Posts, setPosts] = useState([]);
  const [PageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(currentPage).then((result) => {
      setPosts(result.data.results);
      setPageCount(result.data.total_pages)
    });
  }, []);

  function handlePageChange(event, data) {
    setLoading(true);
    setCurrentPage(data.activePage);
    fetchData(data.activePage).then((result) => {
      setPosts(result.data.results);
    });
  };

  return (
    <div style={{ margin: '10px' }}>
      <TagFilter />
      <div style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: 'white', border: '1px solid #e7e8ec' }} >
        <PostListSegment posts={Posts} loading={loading} setLoading={setLoading} />
        <Segment textAlign='center' style={{border: 'None'}}>
          <Pagination defaultActivePage={currentPage}
            firstItem={null}
            lastItem={null}
            pointing secondary
            siblingRange={4}
            totalPages={PageCount}
            onPageChange={handlePageChange}
          />
        </Segment>
      </div>
  </div>
  )
}
