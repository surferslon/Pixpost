import React from 'react';
import {Loader, Dimmer} from "semantic-ui-react";


const Loading = () => {
  return (
    <Dimmer active inverted>
      <Loader size='mini'>Loading</Loader>
    </Dimmer>
  );
}

export default Loading;
