import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import PostNewTheft from './PostNewTheft';

const updateField = (wrapper, name, value) => {
  wrapper.simulate('change', {
    persist: () => {
    },
    target: {
      name,
      value,
    },
  })
}

describe('PostNewTheft component:', () => {
  test('renders without crashing', () => {
    shallow(<PostNewTheft/>);
  });

  test('should match stored snapshot', () => {
    const tree = renderer
      .create(<PostNewTheft/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Title field:', () => {
  let tree;
  const inputSelector = 'input[name="title"]';

  beforeEach(() => {
    tree = mount(<PostNewTheft/>);
  })
  afterEach(() => {
    tree.unmount()
  })

  test('exists', () => {
    expect(tree.find(inputSelector)).toHaveLength(1)
  });

  test('should update an input when it is changed', () => {
    updateField(tree.find(inputSelector), 'title', 'Some bike title')

    const newValue = tree.find(inputSelector).props().value;

    expect(newValue).toEqual('Some bike title');
    expect(tree).toMatchSnapshot();
  });

  test('should show error with invalid title input field on blur', () => {
    const field = tree.find('input[name="title"]')
    field.simulate('focus')

    updateField(field, 'title', 'bad')
    field.simulate('blur', { target: { name: 'title', value: 'bad' } })

    tree.update()
    const updatedField = tree.find('input[name="title"]')
    expect(updatedField.props().value).toEqual('bad')
    expect(updatedField.parent().is('div')).toEqual(true)
  })

});
