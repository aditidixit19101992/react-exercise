import * as React from "react";

export default class Image extends React.Component<{ imageUrl: string }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img width="170" height="120" src={this.props.imageUrl} alt="" />
      </div>
    );
  }
}
