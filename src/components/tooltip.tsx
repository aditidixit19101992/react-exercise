import * as React from "react";
import Image from "./image";

export default class ToolTipGiphy extends React.Component<
  {},
  { imageUrl: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }
  private GIPHY_SEARCH_API_URL = "https://api.giphy.com/v1/gifs/search";
  private API_KEY = "JNDIB37mVJQ4FRbaR17GDJmfkJI1woM8";

  private removeImage(event: any) {
    this.setState({ imageUrl: "" });
  }

  private handleEvent(event: any) {
    if (event.type === "mouseup") {
      var selObj: Selection | null = window.getSelection();
      if (selObj !== null) {
        var word: string = selObj.toString();
        this.fetchGiphy(word);
      }
    }
  }

  private fetchGiphy(word: string) {
    const url =
      this.GIPHY_SEARCH_API_URL +
      "?api_key=" +
      this.API_KEY +
      "&q=" +
      word +
      "&limit=1&offset=0&rating=g&lang=en";

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        if (res !== null || res !== undefined) {
          if (res.data !== null && res.data !== undefined) {
            var images = res.data[0].images;
            if (images !== null && images !== undefined) {
              var original = images.original;
              if (original !== null && original !== undefined) {
                const imageSrc = original.url;
                console.log(imageSrc);
                this.setState({ imageUrl: imageSrc });
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div onClick={(e) => this.removeImage(e)}>
        <h1 onMouseUp={(e) => this.handleEvent(e)}>My Giphy Tooltip</h1>
        <h2 onMouseUp={(e) => this.handleEvent(e)}>
          Just select text and get Giphy!
        </h2>
        <p onMouseUp={(e) => this.handleEvent(e)}> Cats, dogs and Unicorns </p>
        <br />
        <Image imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
