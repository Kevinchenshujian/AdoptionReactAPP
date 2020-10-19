import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  //only run once after first render
  //need some specification for Babel
  state = { loading: true };
  /*
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  */
  componentDidMount() {
    // throw new Error("lol");//create error
    //这边的this用arrow function不回create一个新的context，如果使用function则会
    //create一个新的context
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city} 
                ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;
    //ThemeContext, 因为class里面无法使用hook，所以这里相当于create 一个小component来执行
    //consumer
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {(themeHook) => (
              <button style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
        </div>
      </div>
    );
  }
}

//errorboundary 只能处理children
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
