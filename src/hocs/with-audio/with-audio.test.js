import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";

import withAudio from "./with-audio.js";

const MockComponent = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`WithAudio HOC rendering`, () => {
  it(`WithAudio should render correctly`, () => {
    const tree = renderer
      .create(<MockComponentWrapped
        isPlaying={false}
        onPlayButtonClick={() => {}}
        src={``}
      />, {
        createNodeMock: () => ({})
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
