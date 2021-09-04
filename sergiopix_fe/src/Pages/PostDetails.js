import { Container, Divider, Grid, Header, Image } from "semantic-ui-react";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config";
import { useParams } from "react-router";
import { MEDIA_BASE_URL } from "../Config";


export default function PostList(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [shootedAt, setShootedAt] = useState();
  const [description, setDescription] = useState();
  const [topic, setTopic] = useState();
  const id = useParams()['id'];

  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/${id}/`)
      .then(result => {
        // setPosts(result.data);
        setTitle(result.data.title);
        setShootedAt(result.data.shooted_at);
        setDescription(result.data.description);
        setTopic(result.data.topic);
        setImages(result.data.images);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <Container>
        <Header as='h3' floated='center'>
          {title}
        </Header>
        <Divider clearing/>
        <Grid>
            <Grid.Row>
                {shootedAt}
                {topic}
            </Grid.Row>
            <Grid.Row>
                {description}
            </Grid.Row>
            <Grid.Row>
              {
                images.map((img, idx) => (
                    <div>
                  <Image
                    id={idx}
                    style={{paddingTop: '15px'}}
                    src={`${MEDIA_BASE_URL}/${img.image}`}
                    onClick={(e) => window.open(e.target.src)}
                  />
                  <p>
                      {img.comment}
                  </p>
                  </div>
                ))
              }
            </Grid.Row>

        </Grid>

      </Container>
    )
  }
}
