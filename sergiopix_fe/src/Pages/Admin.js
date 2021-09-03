import { useState, useRef } from "react";
import { API_BASE_URL } from '../Config';
import { Button, Container, Form, Segment } from "semantic-ui-react";
import axios from 'axios';


export default function Admin(props) {
  const [adminAction, setAdminAction] = useState('new');
  const [title, setTitle] = useState('')
  const [shootedAt, setShootedAt] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [images, setImages] = useState([{ file: '', comment: '' }]);


  const handleImageChange = (index, event) => {
      const values = [...images];
      const oldValue = values[index].file;
      values[index].file = event.target.files[0];
      setImages(values);
      if (oldValue) {
        return;
      }
      handleAddFields();
  };

  const handleCommentChange = (index, event) => {
      const values = [...images];
      values[index].comment = event.target.value;
      setImages(values);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = new FormData();
    data.append('title', title);
    data.append('topic', topic);
    data.append('description', description);
    data.append('shooted_at', shootedAt);
    images.map((img, idx) => {
      data.append(`file${idx}`, img['file']);
      data.append(`file${idx}_comment`, img['comment'])
    });
    axios.post(`${API_BASE_URL}/posts/create/`, data)
      .then(response => console.log(response.data.id))
      .catch(response => console.log(response));
  };

  const handleAddFields = () => {
    const values = [...images];
    values.push({ file: '', comment: '' });
    setImages(values);
  };

  return (
    <Container style={{paddingTop: '15px'}}>
      <Button>New post</Button>
      <Button>Edit post</Button>
      <Segment>

          <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Title</label>
                <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>
             <Form.Field>
                <label>Shooted at</label>
                <input placeholder='Shooted at' value={shootedAt} onChange={(e) => setShootedAt(e.target.value)} />
              </Form.Field>
              <Form.TextArea label='Description' placeholder='' value={description}
                onChange={(e) => setDescription(e.target.value)} />
              <Form.Field>
                <label>Topic</label>
                <input placeholder='Topic' value={topic} onChange={(e) => setTopic(e.target.value)} />
              </Form.Field>
              {
                images.map((inputField, index) => (
                  <div className="inline fields" key={`${inputField}~${index}`}>
                    <input name='image' type='file' placeholder='file'
                      onChange={event => handleImageChange(index, event)} />
                    <label>Comment</label>
                    <input name='comment' placeholder='Comment'
                      onChange={event => handleCommentChange(index, event)} />
                   </div>
                ))
              }
                <Button type='submit'>Post</Button>
            </Form>

        </Segment>
    </Container>
  );
}

