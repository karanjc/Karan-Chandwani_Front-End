# Karan-Chandwani_Front-End

This is an assignment that was given by the company Steeleye. It is based on ReactJs.



1. Explain what the simple List component does.

Sol: The list component renders an unordered list (ul) of items, where each item is represented by a SingleListItem component.

- Each SingleListItem component receives the props such as:

- 1. index: a number that represents the index of the item in the list.
- 2. isSelected: a boolean that indicates whether the item is currently selected or not.
- 3. onClickHandler: a function that is called when the item is clicked.
- 4. text: a string that represents the text to be displayed in the item.

- The 'List' component receives an array of objects as items prop, where each object has a text property that contains the text to be displayed in the corresponding item.

- When an item is clicked, its 'onClickHandler' prop is called, which sets the 'selectedIndex' state of the List component to the index of the clicked item. This causes the isSelected prop of the corresponding SingleListItem component to be set to true, which changes the background color of the item to green. The background color of all other items is set to red.

- The List component also has an 'useEffect' hook that is triggered whenever the items prop changes. This hook sets the selectedIndex state to null, which deselects any previously selected item.

- And at last, the List component is memoized using the 'memo' function, which helps to optimize the rendering performance of the component by preventing unnecessary re-renders when the props have not changed.

<br><br>

2. What problems / warnings are there with code?

Sol: 
- In the SingleListItem component, the 'onClickHandler' prop is not wrapped inside an arrow function or a bind call. This means that the onClick event will be immediately triggered when the component is rendered, instead of waiting for a click event.

 FIX:  onClick={() => onClickHandler(index)}.

- In the 'SingleListItem' component, the 'isSelected' prop is not correctly passed to the style object. Instead of passing the boolean value of isSelected, it should pass a conditional statement that sets the background color to green if isSelected is true, or to red if it is false. 

 FIX: style={{ backgroundColor: isSelected ? 'green' : 'red' }}.
 
- In the 'WrappedListComponent' component, the items prop has an incorrect PropTypes validation. The array PropTypes validator takes a shape validator as an argument, which should be PropTypes.shape({...}) instead of PropTypes.shapeOf({...}).
 
 FIX: items: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired })).isRequired.
  
- In the 'WrappedListComponent' component, the 'setSelectedIndex' state is initialized with a function instead of a value. 
  
 FIX: const [selectedIndex, setSelectedIndex] = useState(null).
   
- In the 'SingleListItem' component, the 'isSelected' prop is not correctly passed to the SingleListItem component. The isSelected prop should be passed as a boolean value

 FIX: isSelected={selectedIndex === index}.
 
- In the 'List' component, the index prop is not used in the SingleListItem component. This prop is passed to the SingleListItem component, but it is not used inside the component. If this prop is not needed, it should be removed from the prop types and the component.

<br><br>

3. Please fix, optimize, and/or modify the component as much as you think is necessary.

Sol: 

import React, { useState, useEffect, useCallback, useMemo } from 'react';<br>
import PropTypes from 'prop-types';<br>
<br>
// Single List Item<br>
const SingleListItem = ({ index, isSelected, onClick, text }) => {<br>
  const handleClick = useCallback(() => {<br>
    onClick(index);<br>
  }, [index, onClick]);<br>
<br>
  const backgroundColor = useMemo(() => {<br>
    return isSelected ? 'green' : 'red';<br>
  }, [isSelected]);<br>
<br>
  return (<br>
    <li style={{ backgroundColor }} onClick={handleClick}><br>
      {text}<br>
    </li><br>
  );<br>
};<br>
<br>
SingleListItem.propTypes = {<br>
  index: PropTypes.number.isRequired,<br>
  isSelected: PropTypes.bool.isRequired,<br>
  onClick: PropTypes.func.isRequired,<br>
  text: PropTypes.string.isRequired,<br>
};<br>
<br>
// List Component<br>
const List = ({ items }) => {<br>
  const [selectedIndex, setSelectedIndex] = useState(null);<br>
<br>
  useEffect(() => {<br>
    setSelectedIndex(null);<br>
  }, [items]);<br>
<br>
  const handleClick = useCallback((index) => {<br>
    setSelectedIndex(index);<br>
  }, []);<br>
<br>
  const renderedItems = useMemo(() => {<br>
    return items.map((item, index) => (<br>
      <SingleListItem<br>
        key={index}<br>
        onClick={handleClick}<br>
        text={item.text}<br>
        index={index}<br>
        isSelected={selectedIndex === index}<br>
      /><br>
    ));<br>
  }, [items, handleClick, selectedIndex]);<br>
<br>
  return <ul style={{ textAlign: 'left' }}>{renderedItems}</ul>;<br>
};<br>
<br>
List.propTypes = {<br>
  items: PropTypes.arrayOf(<br>
    PropTypes.shape({<br>
      text: PropTypes.string.isRequired,<br>
    }).isRequired<br>
  ).isRequired,<br>
};<br>
<br>
export default List;
