import withAudio from "./with-audio.js";

import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";

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
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
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
