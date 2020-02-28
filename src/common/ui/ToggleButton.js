import React, { useState } from 'react';

export default function ToggleButton(props) {
  const [active, setActive] = useState(false);

  return props.children({
    active,
    onClick: () => setActive(!active)
  });
}
